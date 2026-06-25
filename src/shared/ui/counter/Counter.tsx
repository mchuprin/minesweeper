import { Digit } from '../digit/Digit';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Counter.module.scss';

interface CounterProps {
	value: number;
	digits?: number;
	className?: string;
}

export const Counter = ({ value, digits = 3, className }: CounterProps) => {
	const clamped = Math.max(0, Math.min(10 ** digits - 1, value));
	const str = String(clamped).padStart(digits, '0');

	return (
		<div className={classNames(styles.counter, {}, [className])}>
			{str.split('').map((char, i) => (
				<Digit key={i} digit={Number(char)} />
			))}
		</div>
	);
};
