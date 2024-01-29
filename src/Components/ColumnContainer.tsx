import { useMemo, useState } from 'react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CiCirclePlus } from 'react-icons/ci'
import { BsSendArrowUp } from 'react-icons/bs'

import { Column, Id, Drill } from './../types/types'
import styles from './ColumnContainer.module.scss'
import { DrillCard } from './DrillCard'
import { Dialog } from './Dialog/Dialog'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  submitDrill: () => void
}

export const ColumnContainer = (props: Props) => {
  const { column, drills, createDrill, deleteDrill, updateDrill, updateDrillStatus, submitDrill } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const drillsIds = useMemo(() => {
    return drills.map((drill) => drill.id)
  }, [drills])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: true
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={styles['dragging-container']}></div>
  }

  return (
    <>
      <div ref={setNodeRef} style={style} className={styles['column-container']}>
        {/* column title */}
        <div {...attributes} {...listeners} className={styles['column-title']}>
          <div>{column.title}</div>
        </div>
        {/* column drill container */}
        <div className={styles['column-drill-container']}>
          <SortableContext items={drillsIds}>
            {drills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                columnId={column.id}
                deleteDrill={deleteDrill}
                updateDrill={updateDrill}
                updateDrillStatus={updateDrillStatus}
              />
            ))}
          </SortableContext>
        </div>
        {/* Column footer */}
        {column.id === 'stock' && (
          <button
            className={styles['column-footer']}
            onClick={() => {
              createDrill(column.id)
            }}
          >
            <CiCirclePlus />
            ドリルを追加
          </button>
        )}
        {column.id === 'drill' && (
          <button
            className={styles['column-footer']}
            onClick={() => {
              setOpenDialog(true)
            }}
          >
            <BsSendArrowUp />
            <span className={styles['column-submit-text']}>送信</span>
          </button>
        )}
      </div>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
        <header>
          <h2>タイトル</h2>
        </header>
        <section>コンテンツ</section>
        <footer>
          <button
            type="button"
            onClick={() => {
              setOpenDialog(false)
              submitDrill()
            }}
          >
            送信
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            キャンセル
          </button>
        </footer>
      </Dialog>
    </>
  )
}
