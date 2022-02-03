import { defineStore } from 'pinia'
import { CreateComponentType } from '@/packages/index.d'
import { ChartLayoutType } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import {
  HistoryStackEnum,
  HistoryStackItemEnum,
  HistoryActionTypeEnum,
  HistoryTargetTypeEnum,
  HistoryItemType,
  ChartHistoryStoreType
} from './chartHistoryStore.d'

export const useChartHistoryStoreStore = defineStore({
  id: 'useChartHistoryStore',
  state: (): ChartHistoryStoreType => ({
    // 后退栈（记录栈）
    backStack: [],
    // 前进栈
    forwardStack: []
  }),
  getters: {
    getBackStack(): Array<HistoryItemType> {
      return this.backStack
    },
    getForwardStack(): Array<HistoryItemType> {
      return this.forwardStack
    }
  },
  actions: {
    /**
     * * 新增记录并插入栈
     * @param item 图表实例
     * @param actionType 动作类型
     * @param targetType 对象类型（默认图表）
     */
    createStackItem(item: CreateComponentType | ChartLayoutType, actionType: HistoryActionTypeEnum, targetType: HistoryTargetTypeEnum = HistoryTargetTypeEnum.CHART) {
      this.pushBackStackItem({
        [HistoryStackItemEnum.ID]: new Date().getTime().toString(),
        [HistoryStackItemEnum.HISTORY_DATA]: item,
        [HistoryStackItemEnum.ACTION_TYPE]: actionType,
        [HistoryStackItemEnum.TARGET_TYPE]: targetType,
      })
    },
    // * 画布初始化
    canvasInit(canvas: ChartLayoutType) {
      this.createStackItem(canvas, HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CANVAS)
    },
    // * 推入记录栈
    pushBackStackItem(item: HistoryItemType | Array<HistoryItemType>): void {
      if (item instanceof Array) this.backStack = [...this.backStack, ...item]
      else this.backStack.push(item)
    },
    // * 推入前进栈
    pushForwardStack(item: HistoryItemType | Array<HistoryItemType>): void {
      if (item instanceof Array)
        this.forwardStack = [...this.forwardStack, ...item]
      else this.forwardStack.push(item)
    },
    // * 移出记录栈
    popBackStackItem( index?: number ): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.backStack.length
      if (index && length >= index) {
        return this.backStack.splice(-index)
      }
      if (this.backStack.length > 0) {
        return this.backStack.pop()
      }
    },
    // * 移出前进栈
    popForwardStack( index?: number ): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.forwardStack.length
      if (index && length >= index) {
        return this.forwardStack.splice(-index)
      }
      if (this.forwardStack.length > 0) {
        return this.forwardStack.pop()
      }
    },
    // * 新增组件记录
    createAddHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CHART)
    },
    // * 更新属性记录（大小、图表属性）
    createUpdateHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.UPDATE, HistoryTargetTypeEnum.CHART)
    },
    // * 删除组件记录
    createDeleteHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.DELETE, HistoryTargetTypeEnum.CHART)
    },
    // * 移动组件记录
    createMoveHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.MOVE, HistoryTargetTypeEnum.CHART)
    },
    // * 改变层级组件记录
    createLaryerHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.LARYER, HistoryTargetTypeEnum.CHART)
    },
    // * 粘贴组件记录
    createPasteHistory(item: CreateComponentType) {
      this.createStackItem(item, HistoryActionTypeEnum.PASTE, HistoryTargetTypeEnum.CHART)
    },
  }
})
