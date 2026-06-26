import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameConfig } from '@shared/store';
import { GameStatus } from '@shared/constants';

function computeElapsed(startTime: number | null): number {
	if (startTime === null) return 0;
	return Math.min(Math.floor((Date.now() - startTime) / 1000), 999);
}

export function useTimer() {
	const gameStatus = useGameConfig((s) => s.gameStatus);
	const startTime = useGameConfig((s) => s.startTime);
	const getElapsedTime = useGameConfig((s) => s.getElapsedTime);
	const [display, setDisplay] = useState(() => computeElapsed(startTime));
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const tick = useCallback(() => {
		setDisplay(getElapsedTime());
	}, [getElapsedTime]);

	const startTimer = useCallback(() => {
		if (intervalRef.current) return;
		tick();
		intervalRef.current = setInterval(tick, 1000);
	}, [tick]);

	const stopTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (gameStatus === GameStatus.PLAYING && startTime !== null) {
			startTimer();
		} else {
			stopTimer();
		}
		return stopTimer;
	}, [gameStatus, startTime, startTimer, stopTimer]);

	useEffect(() => {
		const handleVisibility = () => {
			if (document.hidden) {
				stopTimer();
			} else if (useGameConfig.getState().gameStatus === GameStatus.PLAYING) {
				startTimer();
			}
		};
		document.addEventListener('visibilitychange', handleVisibility);
		return () => document.removeEventListener('visibilitychange', handleVisibility);
	}, [startTimer, stopTimer]);

	if (gameStatus === GameStatus.IDLE) return 0;

	return display;
}
