import { classNames } from '../../lib/classNames/classNames';
import styles from './Digit.module.scss';

interface DigitProps {
	digit: number;
	className?: string;
}

const SEGMENT_MAP: Record<number, boolean[]> = {
	0: [true, true, true, true, true, true, false],
	1: [false, true, true, false, false, false, false],
	2: [true, true, false, true, true, false, true],
	3: [true, true, true, true, false, false, true],
	4: [false, true, true, false, false, true, true],
	5: [true, false, true, true, false, true, true],
	6: [true, false, true, true, true, true, true],
	7: [true, true, true, false, false, false, false],
	8: [true, true, true, true, true, true, true],
	9: [true, true, true, true, false, true, true],
};

export const Digit = ({ digit, className }: DigitProps) => {
	const segments = SEGMENT_MAP[digit] ?? SEGMENT_MAP[0];

	return (
		<div className={classNames(styles.digit, {}, [className])}>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[0], [styles.off]: !segments[0] },
					[styles.top],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[1], [styles.off]: !segments[1] },
					[styles.topRight],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[2], [styles.off]: !segments[2] },
					[styles.bottomRight],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[3], [styles.off]: !segments[3] },
					[styles.bottom],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[4], [styles.off]: !segments[4] },
					[styles.bottomLeft],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[5], [styles.off]: !segments[5] },
					[styles.topLeft],
				)}
			/>
			<div
				className={classNames(
					styles.segment,
					{ [styles.on]: segments[6], [styles.off]: !segments[6] },
					[styles.centre],
				)}
			/>
		</div>
	);
};
