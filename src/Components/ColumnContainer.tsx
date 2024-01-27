import styles from './ColumnContainer.module.scss'
import { Column, Id, Drill } from '../types'
import { DrillCard } from './DrillCard'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id) => void
}

export const ColumnContainer = (props: Props) => {
  const { column, drills, createDrill } = props
  return (
    <div className={styles['column-container']}>
      {/* column title */}
      <div className={styles['column-title']}>
        <div>{column.title}</div>
      </div>
      {/* column drill container */}
      <div className={styles['column-task-container']}>
        {drills.map(drill => {
          return (
            <div key={drill.id}>{drill.content}</div>
          )
        })}
      </div>
      {/* Column footer */}
      <button className={styles['column-footer']} onClick={() => createDrill(column.id)}>
        ドリルを追加
      </button>
    </div>
  )
}
