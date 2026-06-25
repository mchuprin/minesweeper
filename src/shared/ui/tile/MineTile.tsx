import { TileAssetsUrl, TileValue } from '../../constants';
import { classNames } from '../../lib/classNames/classNames';
import type { TileData, TileValueType } from '../../types';
import styles from './MineTile.module.scss';

interface MineTileProps {
	data: TileData;
	index: number;
	onClick: () => void;
}

export const MineTile = ({ data, onClick }: MineTileProps) => {
	const mods = {
		[styles.shown]: data.shown,
		[styles.exploded]: data.exploded,
		[styles.wrongFlag]: data.wrongFlag,
	};

	return (
		<button type="button" className={classNames(styles.tile, { ...mods }, [])} onClick={onClick}>
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
