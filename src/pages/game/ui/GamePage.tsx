import { TileValue, TileValueByMineCount } from '../../../shared/constants';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useGameConfig } from '../../../shared/store';
import { MineTile } from '../../../shared/ui/tile/MineTile';
import { DIFFICULTY_CONFIG } from '../constants';
import styles from './GamePage.module.scss';

interface GameProps {
}

export const GamePage = (props: GameProps) => {
    const diffculty = useGameConfig((state) => state.difficulty)
    const field = useGameConfig((state) => state.field)
    const generateField = useGameConfig((state) => state.generateField)

    // При useEffect должна быть генерация поля, но условием, что она должна быть только один раз (сохранять генерация и открытые поля в localStorage)

    // Event нажатия на tile
    const onClickTile = () => {
        generateField()
    }

    return (
        <div className={classNames(styles.field, {}, [styles[diffculty]])}>
            <MineTile value={TileValue.MINE} onClick={onClickTile} />
        </div>
    )
};
