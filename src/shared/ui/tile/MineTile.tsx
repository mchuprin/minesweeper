import { useState } from 'react';
import { TileAssetsUrl, TileValue, type TileValueType } from '../../constants';
import { classNames } from '../../lib/classNames/classNames';
import styles from './MineTile.module.scss';

interface MineTileProps {
    value: TileValueType,
    onClick: () => void
}

const TileStatus = {
    
} as const

export const MineTile = ({ value, onClick }: MineTileProps) => {
    const [ shown, setShown ] = useState(false);
    const [ flagged, setFlag ] = useState(false);

    const onClickTile = () => {
        setShown(true)
        onClick()
    }

    const mods = {
        [styles.shown]: shown,
        // [styles.mine]: 
    }


    
    return (
        <button className={classNames(styles.tile, { ...mods }, [])} onClick={onClickTile} >
            { flagged && !shown ? <img src="" alt="" /> : '' }
            { shown ? <img src={TileAssetsUrl[value as Exclude<TileValueType, typeof TileValue.EMPTY>]} alt="" /> : "" }
        </button>
    );
};
