import TableCommon from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/Tables/tables.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TableCommonConfig: ConfigType = {
  key: 'VTableCommon',
  conKey: 'VCTableCommon',
  title: '表格',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  node: () => TableCommon,
  conNode: () => Configuration,
  image
}
