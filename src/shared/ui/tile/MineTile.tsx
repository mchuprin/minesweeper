import { TileAssetsUrl, TileValue } from '@shared/constants';
import { classNames } from '@shared/lib/classNames/classNames';
import type { TileData, TileValueType } from '@shared/types';
import styles from './MineTile.module.scss';

interface MineTileProps {
	data: TileData;
	index: number;
	onClick: () => void;
	onContextMenu: () => void;
}

export const MineTile = ({ data, onClick, onContextMenu }: MineTileProps) => {
	const mods = {
		[styles.shown]: data.shown,
		[styles.exploded]: data.exploded,
		[styles.wrongFlag]: data.wrongFlag,
	};

	return (
		<button
			type="button"
			className={classNames(styles.tile, { ...mods }, [])}
			onClick={onClick}
			onContextMenu={(e) => {
				e.preventDefault();
				onContextMenu();
			}}
		>
			{data.wrongFlag && <span className={styles.wrongFlagLine} />}
			{data.flagged && !data.shown && !data.wrongFlag && <img src={TileAssetsUrl.flag} alt="" />}
			{data.shown && (
				<img
					src={
						TileAssetsUrl[
							data.value as Exclude<
								TileValueType,
								typeof TileValue.EMPTY | typeof TileValue.WRONG_FLAG
							>
						]
					}
					alt=""
				/>
			)}
		</button>
	);
};
