import { classNames } from '@shared/lib/classNames/classNames';
import { MineTile } from '@shared/ui';
import type { TileData } from '@shared/types';
import styles from './GameBoard.module.scss';

interface GameBoardProps {
	field: TileData[];
	difficulty: string;
	onClick: (index: number) => void;
	onContextMenu: (index: number) => void;
}

export const GameBoard = ({ field, difficulty, onClick, onContextMenu }: GameBoardProps) => {
	return (
		<div className={classNames(styles.field, {}, [styles[difficulty]])}>
			{field.map((tile, index) => (
				<MineTile
					key={`${difficulty}-${tile.value}-${index}`}
					data={tile}
					index={index}
					onClick={() => onClick(index)}
					onContextMenu={() => onContextMenu(index)}
				/>
			))}
		</div>
	);
};
