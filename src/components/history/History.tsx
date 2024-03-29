import { useStorage } from '../../hooks/useStorage'
import { TabHeader } from '../utilParts/TabHeader'

import styles from './History.module.scss'

export const History = () => {
  const { drillHistory } = useStorage()

  return (
    <>
      <TabHeader />
      <div className={styles['history-wrapper']}>
        {drillHistory.length > 0 &&
          drillHistory.map((drill, i) => {
            return (
              <div key={i}>
                <p className={styles['history-date']}>{drill.date}</p>
                <div key={i} className={styles['history-item']}>
                  <p className={styles['history-memo']}>今日のメモ : {drill.memo}</p>
                  <p className={styles['history-drill-title']}>今日実施したドリル</p>
                  <ul className={styles['history-list']}>
                    {drill.drillItemsChecked.map((item) => {
                      return (
                        <li key={item.id} className={styles['history-list-item']}>
                          {item.content.text}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        {drillHistory.length === 0 && (
          <div className={styles['history-nodata']}>
            <p>
              履歴データは
              <br />
              まだ登録されていません。
            </p>
          </div>
        )}
      </div>
    </>
  )
}
