import { useEffect } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useGameConfig } from '../../../shared/store';
import { MineTile } from '../../../shared/ui/tile/MineTile';
import styles from './GamePage.module.scss';

interface GameProps {
}

export const GamePage = (props: GameProps) => {
    const diffculty = useGameConfig((state) => state.difficulty)
    const field = useGameConfig((state) => state.field)
    const generateField = useGameConfig((state) => state.generateField)

    // При useEffect должна быть генерация поля, но условием, что она должна быть только один раз (сохранять генерация и открытые поля в localStorage)

    useEffect(() => generateField(), [])
    // Event нажатия на tile
    const onClickTile = () => {
        // generateField()
    }

    return (
        <div className={classNames(styles.field, {}, [styles[diffculty]])}>
            { field.map((value) => <MineTile value={value} onClick={onClickTile} />) }
        </div>
    )
};
