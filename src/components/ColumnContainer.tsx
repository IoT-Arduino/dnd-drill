import { useRef } from 'react'
import { IonItem, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react'
import { MdLibraryBooks, MdTaskAlt } from 'react-icons/md'

import { Column, Id, Drill, DrillContent } from './../types/types'
import styles from './ColumnContainer.module.scss'
import { DrillCard } from './DrillCard'
import InputModal from './modal/InputModal'
import { FloatingActionButton } from './utilParts/FloatingActionButton'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id, content: DrillContent) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: DrillContent) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  submitButtonEnabled: boolean
  updateDrillColumnId: (id: Id, columnId: string) => void
  submitDrill: (todayMemo: string) => void
}

export const ColumnContainer = (props: Props) => {
  const {
    column,
    drills,
    createDrill,
    deleteDrill,
    updateDrill,
    updateDrillStatus,
    submitButtonEnabled,
    updateDrillColumnId,
    submitDrill
  } = props

  const footerRef = useRef<HTMLElement | null>(null)
  const scrollToBottom = () => {
    footerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete()
  }

  const columnStyle = () => {
    if (drills.length > 0) {
      return 'column-container-none'
    } else if (column.id === 'stock') {
      return 'column-container-stock'
    } else if (column.id === 'drill') {
      return 'column-container-drill'
    } else {
      return 'column-container-none'
    }
  }

  return (
    <>
      <div className={`${styles[columnStyle()]} ${styles['column-container']}`} id={column.id}>
        {/* column title */}
        <div className={styles['column-title']}>
          <div>
            <span className={styles['column-title-icon']}>
              {column.id === 'drill' ? <MdTaskAlt /> : <MdLibraryBooks />}
            </span>
            {column.title}
          </div>
        </div>
        {/* column drill container */}
        <div className={styles['column-drill-container']}>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {drills.map((drill) => (
              <IonItem key={drill.id} className={styles['column-drill-item']} lines="none">
                <DrillCard
                  drill={drill}
                  columnId={column.id}
                  deleteDrill={deleteDrill}
                  updateDrill={updateDrill}
                  updateDrillStatus={updateDrillStatus}
                  updateDrillColumnId={updateDrillColumnId}
                />
                <IonReorder slot="end" style={{ marginLeft: '0' }}></IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
          <FloatingActionButton createDrill={createDrill} scrollToBottom={scrollToBottom} />
        </div>
        {/* column fotter */}
        {column.id === 'stock' && (
          <InputModal
            mode="createDrill"
            modalButtonTitle="ドリルを追加"
            title="新規ドリル作成"
            subTitle=""
            urlInputLavel="urlアドレス(任意)"
            textAreaLabel="ドリルの内容(必須)"
            placeHolder="ドリルの内容を入力してください"
            button1Label="作成"
            button2Label="キャンセル"
            createDrill={createDrill}
            submitDrill={submitDrill}
            disabled={false}
          />
        )}
        {column.id === 'drill' && (
          <InputModal
            mode="submitToday"
            modalButtonTitle="送信"
            title="今日のドリルを送信"
            subTitle="本日もお疲れ様でした"
            textAreaLabel="今日のメモ"
            placeHolder="今日のメモを入力してください"
            button1Label="送信"
            button2Label="キャンセル"
            disabled={!submitButtonEnabled}
            createDrill={createDrill}
            submitDrill={submitDrill}
          />
        )}
        <div ref={footerRef as React.LegacyRef<HTMLDivElement>} style={{ visibility: 'hidden' }}></div>
      </div>
    </>
  )
}
