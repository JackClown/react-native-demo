import store from '@/store';
import { Image } from 'react-native-image-crop-picker';
import { ReplenishForm } from '@/config/enums';

declare namespace Global {
  interface ManageTemplate {
    managementTemplateNum: number;
    managementTemplateName: string;
    branchNum: number;
  }

  interface InventoryItem {
    inventoryAmount: number;
    inventoryMoney: number;
    inventoryPrice: number;
    inventorySaleMoney: number;
    inventoryUseAmount: number;
    itemName: string;
    itemNum: number;
    storehouseNum: number;
    storehouseName: string;
    itemUnit: string;
  }

  interface ExpressCompany {
    expressCompanyName: string;
    expressCompanyLinkMan: string;
    expressCompanyPhone: string;
    expressCompanyFax: string;
    expressCompanyMobile: string;
    expressCompanyAddr: string;
    expressCompanyWeb: string;
    expressCompanyMemo: string;
    expressCompanyType: string;
    expressCompanyVolume: number;
    expressCompanyWeight: number;
    expressCompanyRealName: string;
    expressCompanyAccount: string;
    expressCompanyPsw: string;
    expressCardCompany: string;
  }

  interface ItemFlag {
    itemFlagNum: number;
    systemBookCode: string;
    itemFlagName: string;
    itemFlagType: string;
    itemFlagDetails: BaseItem[];
  }

  interface BranchRegion {
    branchRegionName: string;
    branchRegionNum: number;
    parentRegionNum?: number;
  }

  interface PriceTagTemplate {
    reportId: string;
    reportDefault: boolean;
    reportName: string;
    reportMemo: string;
  }

  interface Brand {
    posItemBrandCode: string;
    posItemBrandName: string;
    posItemBrandPinYin: string;
  }

  interface NotificationState {
    onlineOrderFetchNotice: boolean;
    onlineOrderTransferNotice: boolean;
  }

  interface Preferences {
    categoryLevel: '顶级类' | '一级类' | '二级类' | '三级类';
    stockTakingAdd: boolean; //盘点是否累加
    replenishmentUseTemplate: boolean;
    replenishForm: ReplenishForm;
    filterRequestTime: boolean;
    filterRequestNoStock: boolean;
    filterWholesaleNoStock: boolean;
    onlyShowLoss: boolean;
    network: boolean;
    level2Price: boolean;
    level3Price: boolean;
    level4Price: boolean;
    enableScanMode: boolean;
    storehouse: {
      purchaseRecieve: number;
      purchaseBack: number;
      transferIn: number;
      transferOut: number;
      wholesale: number;
    };
    stockTakingAudit: boolean; //盘点单提交即审核
    printer: {
      id: string;
      name: string;
    };
    enableLabelPrinter: boolean;
    printerPaper: string;
    labelType: {
      priceTag?: string;
      packingPrice?: string;
    };
    scale: {
      id: string;
      name: string;
    };
    enableScale: boolean;
    scaleType: string;
    usalApps: string[];
    usalReports: string[];
    goodsLayout: {
      replenishment?: Array<[string, number | null]>;
    };
  }

  interface Role {
    systemRoleNum: number;
    systemRoleName: string;
  }

  interface MercuryUser {
    mercury_api_key: string;
    nickname: string;
    phone: string;
    login: string;
    appid: string;
    merchant_name: string;
    merchant_logo: string;
    merchant_slug: string;
    merchant_weixin_auth: string;
    user_role: string[];
    user_role_v2: string[];
    book_code: string;
    role: string;
    permission: string[];
    allow_store_assistant: string;
    stores: {
      id: number;
      name: string;
      branch_name?: string;
    }[];
  }

  interface User {
    appUserStockRole: string;
    appUserDepartment: string;
    bookCode: string;
    branchNum: number;
    branchType: string;
    branchName: string;
    branchRdc: boolean;
    centerBranchNum: number;
    centerBranchName: string;
    privileges: string[];
    userName: string;
    userCode: string;
    userEmail: string;
    userPhone: string;
    userId: string;
    branchRegionNum?: string;
    regions: Region[];
    userType: string;
    clientFid: string;
    clientName: string;
    clientPhone: string;
    clientType: string;
    clientShipAddr: string;
    wholesaleBookDefaultState: string;
    branchs: {
      branchType: string;
      branchNum: number;
      branchName: string;
      branchRegionNum: number;
      branchRegionName: string;
      branchCode: string;
      branchStatus: number;
    }[];
    branchParamMap: {
      ENABLE_TRANSFER_EXCESS_PRESENT: 'true' | 'false';
    };
    enableBranchGrouping: boolean;
    appMachineTerminal?: string;
    branchModule: string;
    systemRoleNum: number;
    limitTimeCount: number;
    limitTimeType: string;
    mercuryUserPhone: number;
    branchProduct: string;
    branchStatus: number;
    userMaxDiscount: number;
    employeeName: string;
    appId: string;
  }

  interface BaseItem {
    itemNum: number;
    itemName: string;
    itemCode: string;
    itemCostMode: string;
    itemSpec: string;
    itemPinyin: string;
    itemBarcode: string;
    itemType: number;
    itemUnit: string;
    itemAssistUnit?: string;
    itemAssistRate?: number;
    posImageDTOS: Array<{
      posImageId: string;
      posImageUrl: string;
      posImageDefault?: boolean;
    }>;
  }

  interface FullItem extends Goods.Item {
    itemOutTax: number;
    itemInTax: number;
    itemRemindPeriod: number;
    itemNoteInfo: string;
    itemMaxPrice: number;
    itemMinPrice: number;
    itemBrand: string;
    posItemMatrix: {
      itemExtend1: string;
      itemExtend2: string;
      itemExtend3: string;
      itemExtendName1: string;
      itemExtendName2: string;
      itemExtendName3: string;
    };
  }

  interface APIImage {
    ossImagePath: string;
    ossImageReadPath: string;
    systemBookCode: string;
    systemImageContext: string;
    systemImageCreateTime: string;
    systemImageFileSize: number;
    systemImageHeight: number;
    systemImageId: string;
    systemImageKind: string;
    systemImageName: string;
    systemImageOrder: number;
    systemImagePath: string;
    systemImageRefBill: string;
    systemImageRefType: string;
    systemImageRegion: number;
    systemImageResource: string;
    systemImageType: string;
    systemImageUrl: string;
    systemImageWidth: number;
    itemNum?: number;
  }

  interface Account {
    accountBankName: string;
    accountBankNo: string;
    accountBankNum: number;
  }

  interface Unit {
    itemUnitCode: string;
    itemUnitDefault: boolean;
    itemUnitName: string;
    itemUnitRate: number;
    itemUnitType: '固定换算' | '浮动换算';
  }

  interface Department {
    itemDepartmentName: string;
    itemDepartmentTransferType: string;
  }

  type State = ReturnType<typeof store.getState>;

  interface Message {
    appUserNum?: number;
    messageBoardContent: string;
    messageBoardCreateTime: string;
    messageBoardId: string;
    messageBoardRefId?: string;
    messageBoardSender: string;
    messageBoardSubject: string;
    messageReadTime?: string;
    systemBookCode: string;
    messageBoardDetails: [
      {
        appUserNum: number;
        messageBoardDetailNum: number;
        messageBoardId: string;
        messageCategory: string;
        messageReadTime?: string;
        messageReceiver: string;
        messageReceiverBranch: string;
        systemBookCode: string;
      }
    ];
  }

  interface Notice {
    noticeId: string;
    systemBookCode: number;
    branchNum: number;
    noticeTitle: string;
    noticeContext: string;
    noticeCreateTime: string;
    noticeCreator: string;
    noticeAuditor: string;
    noticeExpireDay: string;
    noticeAuditTime: string;
    noticeCategory: string;
    noticePop: boolean;
    urls: string[];
  }

  interface Region {
    regionName: string;
    regionNum: number;
    regionParentNum: number;
  }

  interface Client {
    bookCode: string;
    branchNum: number;
    clientCode: string;
    clientCompany: string;
    clientFid: string;
    clientName: string;
    clientPhone: string; //电话号码
    clientType: string;
    regionNum?: number; //区域
    regionName?: string;
    clientPinyin: string;
    // clientShipAddr: string;
    clientLinkman: string; //联系人
    clientAddr01: string; //联系人地址
    clientMobile: string; //联系人电话
    clientGradeNum?: number; //客户等级
    clientGradeName?: string;
    clientNoteInfo: string;
    clientSettlePeriod: number;
    clientSettleDayOfMonth: number;
    clientSettlementType: string;
    clientEmployeeName?: string; //销售员
  }

  interface LotItem {
    itemNum: number;
    lotAmount: number;
    lotAssistAmount: number;
    lotCostPrice: number;
    lotNumber: string;
    lotProducingDate: string; //YY-MM-DD HH:mm:ss
    lotRate: number;
    lotUseAmount: number;
    lotUseUnit: string;
  }

  interface Branch {
    branchNum: number;
    branchCode: string;
    branchName: string;
    branchType: string;
    branchRegionNum: number;
  }

  interface TreeItem {
    key: string;
    label: string;
    children: TreeItem[];
  }

  interface Label {
    paramName: string;
  }

  interface BarCode {
    itemBarCode: string;
    itemBarCreateDate: string;
    itemBarNum: number;
    itemBarRate: number;
    itemNum: number;
    systemBookCode: string;
  }

  interface Item {
    itemNum: number;
    itemName: string;
    itemCode: string;
    itemBarcode: string;
    itemType: number;
    itemSpec: string;
    itemPinyin: string;
    itemUnit: string;
    itemCategoryCode: string;
    itemCostMode: string;
    itemRegularPrice: number;
    itemTransferPrice: number; //配送价 基本单位
    itemTransferRate: number;
    itemTransferUnit: string;
    itemInventoryRate: number;
    itemInventoryUnit: string;
    itemPurchaseRate: number;
    itemPurchaseUnit: string;
    itemAssistRate?: number;
    itemAssistUnit?: string;
    posImageDTOS: Array<{
      posImageId: string;
      posImageUrl: string;
      posImageDefault?: boolean;
    }>;
  }

  interface GradeItem {
    itemDepartment: string;
    itemGradeBarcode: string;
    itemGradeCode: string;
    itemGradeDiscounted: boolean;
    itemGradeLevel2Price: number;
    itemGradeLevel3Price: number;
    itemGradeLevel4Price: number;
    itemGradeName: string;
    itemGradeNum: number;
    itemGradePinyin: string;
    itemGradeRegularPrice: number;
    itemGradeType: number;
    itemInventoryQty: number;
    itemMinPrice: number;
    itemMaxPrice: number;
    itemNum: number;
    itemPriceTagFlag: boolean;
    itemSaleCeaseFlag: boolean;
    itemSpec: string;
    itemUnit: string;
    policyPrice: number;
  }

  interface Storehouse {
    bookCode: string;
    branchNum: number;
    storehouseCode: string;
    storehouseDelTag: boolean;
    storehouseName: string;
    storehouseNum: number;
  }

  interface Supplier {
    supplierCode: string;
    supplierKind: string;
    supplierName: string;
    supplierNum: number;
    supplierPin: string;
    supplierAddr: string;
    supplierLinkman: string;
    supplierLinktel: string;
    supplierMethod: string;
    // supplierPhone: string;
    supplierSettleDays: string;
    supplierSettlePeriod: number;
    supplierSettlementType: string;
    supplierMemo: string;
    timestamp: string;
  }

  interface InventoryAdjustmentReason {
    adjustmentReasonCode: string;
    adjustmentReasonName: string;
    adjustmentInoutType: string; //出入库
    adjustmentInoutCategory: string; //报损 调整
    adjustmentReasonMemo?: string;
  }

  interface Category {
    categoryCode: string;
    categoryName: string;
    parentCategoryCode?: string;
  }
}

declare namespace Replenishment {
  interface APIItem extends Global.BaseItem {
    itemTransferUnit: string;
    itemTransferRate: number;
    itemBranchTransferPrice: number; //门店配送价 基本单位
    itemBranchSalePrice: number;
    itemCenterInventoryQty: number; //开启辅助单位的情况下， 这个常用数量
    itemInventoryQty: number;
    itemRequestLowerLimit?: number;
    itemRequestUpperLimit?: number;
    dcmRequestMultiple?: number;
    itemTag: number; // 2为推荐商品
    itemDelTag: boolean;
    itemValidPeriod: number;
    noStockNoRequest?: boolean;
    boundGood?: boolean;
    cannotReturn?: boolean;
    itemDepartment: string;
    itemSaleAmount?: number;
    itemSaleMoney?: number;
    itemSaleEqAmount?: number;
    itemSaleEqMoney?: number;
  }

  interface Item extends APIItem {
    dcmRequestMultiple: number; //如果为0，则不限制
    requestLowerLimit: number; //不限制为0
    requestUpperLimit: number; //不限制为10**9
    centerInventoryQty: number; //0则无，不限制为10**9
  }

  interface APIOrderItem {
    itemBarcode?: string[];
    itemCode: string;
    itemNum: number;
    itemName: string;
    itemPinyin: string;
    itemPrice: number;
    itemUsePrice: number;
    itemUseQty: number;
    itemUseUnit: string;
    itemUseRate: number;
    itemMemo: string;
    presentQty?: string;
    presentUnit?: string;
  }

  interface OrderItem extends Item {
    count: number;
    notes: string;
    itemPrice: number;
    itemUseUnit: string;
    itemUseRate: number;
    itemUsePrice: number;
    presentQty?: string;
    presentUnit?: string;
  }

  interface Order {
    orderAuditTime: string;
    orderAuditor: string;
    orderCreator: string;
    orderCreateTime: string;
    orderFid: string;
    orderState: number;
    orderMemo: string;
    orderTotalMoney: number;
    branchNum: number;
    branchName: string;
    outBranchNum: number;
    requestOrderCreateTime: string;
    requestOrderTransferState: string;
    details: OrderItem[];
  }
}

declare namespace TransferIn {
  interface Order {
    branchNum: number;
    branchName: string;
    orderAuditTime: string;
    orderAuditor: string;
    orderCreateTime: string;
    orderCreator: string;
    orderFid: string;
    orderMemo: string;
    orderState: number;
    orderStateName: string;
    orderTotalMoney: number;
    orderUuid: string;
    outBranchName: string;
    outBranchNum: number;
    outOrderFid: string;
    storehouseNum: number;
    storehouseName: string;
    details: OrderItem[];
  }

  type OrderItem = TransferConfirm.OrderItem;
}

declare namespace TransferConfirm {
  interface Order {
    orderFid: string;
    outOrderFid: string; // 按调入单收货中才有这个字段
    outBranchName: string;
    outBranchNum: number;
    orderMemo: string;
    orderStateType: number; // 3已经全部调入，根据outOrderInState生成
    orderStateText: string;
    orderCreateTime: string;
    orderTotalMoney: number;
    details: OrderItem[];
  }

  interface Item {
    itemNum: number;
    itemName: string;
    itemPinyin: string;
    itemSpec: string;
    itemCode: string;
    itemCostMode: string;
    itemLotNumber?: string;
    itemBarcodes: string;
    itemMoney: number;
    itemPrice: number;
    itemUnit: string;
    itemUsePrice: number;
    itemUseUnit: string;
    itemUseRate: number;
    itemQty: number;
    itemUseQty: number;
    itemTare?: number;
    itemAssistUnit: string;
    outOrderDetailInQty: number;
    orderDetailNum: number;
  }

  interface OrderItem extends Item {
    maxItemQty: number;
    maxItemUseQty: number;
    itemMemo: string;
    confirmed?: boolean;
  }
}

declare namespace TransferOut {
  interface Item extends Global.Item {
    itemBranchTransferPrice: number;
  }

  interface OrderItem extends Item {
    itemQty: number;
    itemPrice: number;
    itemUsePrice: number;
    itemUseQty: number;
    itemUseUnit: string;
    itemUseRate: number;
    itemMemo: string;
    itemMoney: number;
    itemLotNumber: string;
    orderDetailNum: number;
  }

  interface APIOrderItem {
    itemAssistQty: number;
    itemBarcode: string;
    itemBarcodes: string;
    itemCode: string;
    itemCostMode: string;
    itemLotNumber: string;
    itemMemo: string;
    itemMoney: string;
    itemName: string;
    itemNum: number;
    itemPinyin: string;
    itemPresentQty: number;
    itemPrice: number;
    itemQty: number;
    itemSalePrice: number;
    itemUnit: string;
    itemUsePrice: number;
    itemUseQty: number;
    itemUseRate: number;
    itemUseUnit: string;
    orderDetailNum: number;
    orderFid: string;
    outOrderDetailInQty: number;
  }

  interface Order {
    branchName: string;
    branchNum: number;
    orderAuditTime: string;
    orderAuditor: string;
    orderCreateTime: string;
    orderCreator: string;
    orderFid: string;
    orderMemo: string;
    orderState: number;
    orderStateName: string;
    outBranchName: string;
    outBranchNum: number;
    storehouseNum: number;
    storehouseName: string;
    details: OrderItem[];
  }
}

declare namespace InventoryAdjustment {
  interface Item extends Global.BaseItem {
    itemInventoryUnit: string;
    itemInventoryRate: number;
    itemBranchSalePrice: number;
  }

  interface OrderItem {
    orderDetailNum: number;
    itemNum: number;
    itemName: string;
    itemCode: string;
    itemCostMode: string;
    itemBarcodes: string;
    itemUnit: string;
    itemUseUnit: string;
    itemSpec: string;
    itemQty: number;
    itemUseQty: number;
    itemPrice: number;
    itemUsePrice: number;
    itemLotNumber?: string;
    itemMemo: string;
    itemUseRate: number;
    itemAssistUnit?: string;
  }

  interface Order {
    branchNum: number;
    branchName: string;
    orderCreator: string;
    orderCreateTime: string;
    orderAuditor: string;
    orderAuditTime: string;
    orderFid: string;
    orderMemo: string;
    orderState: number;
    orderStateName: string;
    adjustmentOrderDirection: string;
    adjustmentReasonCode: string;
    adjustmentReasonName: string;
    storehouseName: string;
    storehouseNum: number;
    details: OrderItem[];
  }

  interface OrderImage extends Image {
    ossObjectFid?: string;
    name?: string;
    isDel?: boolean;
  }

  interface APIOrderItem {
    // adjustmentOrderDetailInventoryQty: number;
    itemCode: string;
    itemMemo: string;
    itemName: string;
    itemNum: number;
    itemPrice: number;
    itemQty: number;
    itemUnit: string;
    itemSpec: string;
    itemUsePrice: number;
    itemUseQty: number;
    itemUseRate: number;
    itemUseUnit: string;
    itemLotNumber: string;
    orderDetailNum: number;
  }
}

declare namespace StockTaking {
  interface APIItem extends Global.Item {
    itemBars: Global.BarCode[];
    posItemGrades?: Global.GradeItem[];
    itemNumFather?: string;
    itemDelTag: boolean;
  }

  interface Item extends Global.Item {
    itemNumFather: string;
    itemBarcodes: string;
    itemGradeBarcodes: string;
  }

  interface TableRow {
    item_num: number;
    item_code: string;
    item_lot_number: string;
    item_name: string;
    item_barcodes: string;
    item_pinyin: string;
    item_unit: string;
    item_transfer_unit: string;
    item_purchase_unit: string;
    item_inventory_unit: string;
    item_assist_unit: string;
    item_num_father: string;
    item_spec: string;
    item_type: number;
    item_grade_barcodes: string;
    item_transfer_rate: number;
    item_purchase_rate: number;
    item_inventory_rate: number;
    item_assist_rate: number;
    item_category_code: string;
  }

  interface Order {
    orderFid: string;
    branchNum: number;
    orderCreator: string;
    orderCreateTime: string; // YYYY-MM-DD HH:mm:ss
    orderTotalMoney: string;
    orderState: number;
    orderStateName: string;
    storehouseNum: number;
    storehouseName: string;
    checkOrderScope: string;
    checkOrderUnit: string;
    pc: number;
    checkOrderLastEditTime: string;
  }

  interface OrderItem
    extends Pick<
      Global.Item,
      'itemNum' | 'itemName' | 'itemPinyin' | 'itemCode' | 'itemSpec' | 'itemCostMode' | 'itemBarcode'
    > {
    itemAssistUnit?: string;
    itemUseUnit: string;
    itemUseQty?: number; // 不存在则为还未参与盘点的商品
    itemUseRate: number;
    itemBarcodes: string;
    itemLotNumber: string;
    orderDetailNum: number;
    itemMemo: string;
    originalItemUseQty?: number;
    originalItemUseRate?: number;
    originalItemUseUnit?: string;
  }

  interface Draft {
    orderUuid: string;
    orderFid: string;
    branchNum: number;
    storehouseNum: number;
    storehouseName: string;
    checkOrderUnit: string;
    orderCreateTime?: string;
    checkOrderLastEditTime: string;
    pc: number;
    details: OrderItem[];
  }

  interface APIOrder {
    orderFid: string;
    storehouseName: string;
    storehouseNum: number;
    orderCreator: string;
    orderCreateTime: string;
    orderAuditor: string;
    orderAuditTime: string;
    checkOrderUnit: string;
    checkOrderScope: string;
    orderState: number;
    orderMemo: string;
    branchNum: number;
    branchName: string;
    details: APIOrderItem[];
  }

  interface APIOrderItem {
    itemAssistUnit?: string;
    itemAssistQty: number;
    itemBarcode: string;
    itemBarcodes: string;
    itemCode: string;
    itemCostMode: string;
    itemInventoryRate: number;
    itemInventoryUnit: string;
    itemLotNumber: string;
    itemMatrixNum: number;
    itemMoney: number;
    itemName: string;
    itemNum: number;
    itemPinyin: string;
    itemPrice: number;
    itemQty: number;
    itemStockQty: number;
    itemType: string;
    itemUnit: string;
    itemUsePrice: number;
    itemUseQty: number;
    itemUseRate: number;
    itemUseUnit: string;
    orderDetailNum: number;
    itemSpec: string;
    itemMemo?: string;
  }
}

declare namespace PriceAdjustment {
  interface Item extends Global.BaseItem {
    posItemGrades: Global.GradeItem[];
    itemBranchSalePrice: number;
    itemBranchSalePrice2: number;
    itemBranchSalePrice3: number;
    itemBranchSalePrice4: number;
    itemLatestInPrice?: number;
    itemBranchTransferPrice: number;
    itemTransferPrice: number;
    branchPriceAdj: boolean; //是否允许调价
    itemMaxPrice: number;
    itemMinPrice: number;
  }

  interface OrderItem {
    itemNum: number;
    posImageDTOS: Global.Item['posImageDTOS'];
    itemGradeNum?: number;
    itemName: string;
    itemSpec: string;
    itemUnit: string;
    itemBarcode: string;
    itemPinyin: string;
    itemCode: string;
    level2Price: number;
    level3Price: number;
    level4Price: number;
    regularPrice: number;
    oriLevel2Price: number;
    oriLevel3Price: number;
    oriLevel4Price: number;
    oriRegularPrice: number;
    itemLatestInPrice?: number;
    itemBranchTransferPrice: number;
    itemMaxPrice: number;
    itemMinPrice: number;
  }

  interface Order {
    appliedBranchs: {
      branchName: string;
      branchNum: number;
    }[];
    branchNum: number;
    branchName: string;
    details: OrderItem[];
    effectiveDate: string;
    invalidTime: string;
    orderAuditTime?: string;
    orderAuditor?: string;
    orderCreateTime: string;
    orderCreator: string;
    orderFid: string;
    orderMemo: string;
    orderState: number;
    orderStateName: string;
    priceAdjustmentLevel: string;
    priceAdjustmentEffect: boolean;
  }

  interface APIOrder extends Omit<Order, 'details'> {
    details: {
      itemNum: number;
      itemGradeNum?: number;
      oriRegularPrice: number;
      regularPrice: number;
      oriLevel2Price: number;
      level2Price: number;
      oriLevel3Price: number;
      level3Price: number;
      oriLevel4Price: number;
      level4Price: number;
      posItemGrade?: Global.GradeItem;
    }[];
  }

  interface BranchPrice {
    branchName: string;
    branchNum: number;
    itemNum: number;
    storeMatrixLevel2Price: number;
    storeMatrixLevel3Price: number;
    storeMatrixLevel4Price: number;
    storeMatrixRegularPrice: number;
  }
}

declare namespace GoodsSearch {
  interface Item extends Global.BaseItem {
    itemSaleCeaseFlag: boolean;
    itemCategory: string;
    itemCategoryCode: string;
    itemDepartment: string;
    itemPlace: string;
    itemInventoryQty: number;
    posItemGrades: Global.GradeItem[];
    itemBranchSalePrice: number;
    itemBranchSalePrice2: number;
    itemBranchSalePrice3: number;
    itemBranchSalePrice4: number;
    itemBranchTransferPrice: number;
    itemTransferPrice: number;
    itemPurchaseRate: number;
    itemPurchaseUnit: string;
  }

  interface Inventory {
    systemBookCode: string;
    branchNum: number;
    itemNum: number;
    inventoryAmount: number;
    storehouseNum: number;
    storehouseName: string;
  }

  interface Supplier {
    supplierNum: number;
    supplierName: string;
    itemNum: number;
    itemName: string;
    itemCode: string;
    itemSpec: string;
    itemCategory: string;
    itemCategoryCode: string;
    itemBarcode: string;
    branchNum: number;
    branchName: string;
    storeItemSupplierTax: number;
    storeItemCarriage: number;
    storeItemSupplierAppendPrice: number;
    storeItemSupplierMin: number;
    storeItemSupplierCost: number;
    storeItemSupplierMaxPrice: number;
    storeItemSupplierMinPrice: number;
    storeItemSupplierLastestPrice: number;
    storeItemSupplierLastestTime: string;
    branchPrice: number;
  }
}

declare namespace PurchaseOrder {
  interface Item extends Global.BaseItem {
    itemTransferRate: number;
    itemTransferUnit: string;
    itemInventoryRate: number;
    itemInventoryUnit: string;
    itemWholesaleRate: number;
    itemWholesaleUnit: string;
    itemPurchasePrice: number; //基本单位 订单收货价或者供应商约定价格
    itemPurchaseRate: number;
    itemPurchaseUnit: string;
    itemCostPrice: number;
    storeItemSupplierCost?: number; //供应商约定价格
    newItem: boolean;
    itemValidPeriod: number;
    policyPrice?: number;
  }

  interface OrderItem {
    orderDetailNum: number;
    itemNum: number;
    itemName: string;
    itemCode: string;
    itemBarcodes: string;
    itemPinyin: string;
    itemUseRate: number;
    itemPrice: number;
    itemUsePrice: number;
    itemQty: number;
    itemUseQty: number;
    itemUnit: string;
    itemUseUnit: string;
    itemAssistUnit?: string;
    itemMemo: string;
    itemPresentQty: number;
    itemPresentUseQty: number;
    itemPresentUnit: string;
    itemPresentUseRate: number;
    recievedAmount: number;
  }

  interface Order {
    orderFid: string;
    branchNum: number;
    branchName: string;
    orderAuditor: string;
    orderAuditTime: string;
    orderCreateTime: string;
    orderCreator: string;
    orderMemo: string;
    orderState: number;
    orderStateName: string;
    storehouseNum: number;
    storehouseName: string;
    storehouseBranchNum: number;
    storehouseBranchName: string;
    supplierNum: number;
    supplierName: string;
    details: OrderItem[];
  }
}

declare namespace Purchase {
  interface OrderItem
    extends Pick<
      Global.Item,
      | 'itemNum'
      | 'itemSpec'
      | 'itemName'
      | 'itemCode'
      | 'itemBarcode'
      | 'itemPinyin'
      | 'itemAssistUnit'
      | 'itemAssistRate'
      | 'itemPurchaseUnit'
      | 'itemPurchaseRate'
      | 'itemCostMode'
      | 'posImageDTOS'
    > {
    itemBranchSalePrice: string; //门店标准售价
    itemPurchasePrice: number; //基本单位 订单收货价或者供应商约定价格
    storeItemSupplierCost?: number; //供应商约定价格
    itemUnit: string;
    itemBarcodes: string;
    itemQty: number;
    itemPrice: number;
    itemSalePrice: number;
    itemUseQty: number;
    itemUsePrice: number;
    itemUseUnit: string;
    itemUseRate: number;
    itemPresentUseQty: number;
    itemPresentUseRate: number;
    itemPresentUnit: string;
    itemLotNumber: string;
    itemMemo: string;
    itemMoney: number;
  }

  interface Item extends Global.Item {
    itemBarcodes: string;
    itemCostPrice: number; //基本单位
    itemPurchasePrice: number; //这个是基本单位！
    itemBranchSalePrice: string;
    storeItemSupplierCost: number; //供应商约定价格
    policyPrice?: number;
  }
}

declare namespace PurchaseReceive {
  interface Order {
    orderFid: string;
    branchNum: number;
    branchName: string;
    orderAuditor?: string;
    orderAuditTime?: string;
    orderCreator: string;
    orderCreateTime?: string;
    orderState: number;
    storehouseNum: number;
    storehouseName: string;
    supplierNum: number;
    supplierName: string;
    details: OrderItem[];
    orderMemo: string;
    receiveOrderType?: string;
    purchaseOrderFid?: string;
    images?: ImageType[];
  }

  interface OrderItem extends Purchase.OrderItem {
    itemBarcodes: string;
    orderDetailNum?: number;
    purchaseOrderPresentQty?: number; //按单收货中， 订单的赠品数量
    purchaseOrderPresentUnit?: string; //按单收货中， 订单的赠品单位
    itemOrderUseQty?: number; //按单收货中， 订单的收货数量
    itemOrderQty?: number; //按单收货中， 订单的基本数量
    itemOrderUseUnit?: string; //按单收货中， 订单的常用单位
    itemOrderUseRate?: number; //按单收货中， 订单的常用单位换算率
    recievedAmount?: number; //按单收货中， 订单的已收数量
    confirmed?: boolean; //按订单收货中，是否已经确认
    orderDetailPurchaseQty?: number;
    orderDetailPurchaseUseQty?: number;
  }
}

declare namespace PriceTag {
  interface Item extends Global.BaseItem {
    itemBranchSalePrice: number;
    itemBranchSalePrice2: number;
    itemBranchSalePrice3: number;
    itemBranchSalePrice4: number;
  }

  interface OrderItem {
    itemNum: number;
    itemName: string;
    itemGradeNum?: number;
    itemAmount?: number;
    item: Item;
    gradeItem?: Global.GradeItem;
    posImageDTOS: Item['posImageDTOS'];
  }
}

declare namespace PurchaseBack {
  interface Order {
    branchNum: number;
    branchName: string;
    orderFid: string;
    orderState: number;
    orderStateName: string;
    orderCreator: string;
    orderCreateTime: string;
    orderAuditor: string;
    orderAuditTime: string;
    storehouseName: string;
    storehouseNum: number;
    supplierName: string;
    supplierNum: number;
    orderMemo: string;
    details: OrderItem[];
    receiveOrderFid?: string;
  }

  interface OrderItem {
    orderDetailNum: number;
    itemNum: number;
    itemCode: string;
    itemBarcodes: string;
    itemPinyin: string;
    itemSpec?: string;
    itemCostMode: string;
    itemName: string;
    itemUnit: string;
    itemMemo: string;
    itemAssistUnit?: string;
    itemUseUnit: string;
    itemUseRate: number;
    itemPrice: number;
    itemUsePrice: number;
    itemQty: number;
    itemUseQty: number;
    itemMoney: number;
    itemPresentUseQty: number;
    itemPresentUnit: string;
    itemPresentUseRate: number;
    itemLotNumber?: string;
    returnOrderDetailInventoryQty: number;
    itemSalePrice: number;
  }
}

declare namespace OnlineOrder {
  interface Order {
    deliverable: boolean;
    id: number;
    title: string;
    display_order_id: string;
    platform: number;
    platform_str: string;
    shipping_type: number;
    buyer_message: string;
    status: number;
    refund_status: number;
    receiver_address: string;
    receiver_name: string;
    receiver_phone: string;
    post_fee: number;
    payment: number;
    total_fee: number;
    package_fee: number;
    created_at: string;
    ama_store_id: number;
    order_items: OrderItem[];
    verify_deadline_time: string;
    expected_delivery_time: null | string;
    more_refund_less_pay: boolean;
    more_refund_less_pay_state: string;
  }

  interface OrderItem {
    id: number;
    total_ama_num: string;
    num: number;
    image_url: string;
    refunded_num: number;
    spec_name: string;
    title: string;
    price: number;
    payment: number;
    real_payment: number;
    total_fee: number;
    ama_item_id?: string;
    refund_status: number;
    more_refund_less_pay: boolean;
  }

  interface Refund {
    id: number;
    number: string;
    state: string;
    refund_reason_type: number;
    refund_type: number;
    refund_amount: number;
    refund_reason: null | string;
    refund_remark: string;
    refund_success_time: null | string;
    reject_refund_reason: null | string;
    apply_time: string;
    product_name: string;
    goods_status: number;
    spec_name: string;
  }
}

declare namespace InternalApply {
  interface Item extends Global.Item {
    itemBranchSalePrice: number;
    itemBranchTransferPrice: number;
    cannotReturn: boolean;
  }

  interface OrderItem {
    innerOrderDetailApproveMemo: string;
    innerOrderDetailAssistQty: number;
    innerOrderDetailAssistUnit: string;
    innerOrderDetailAuditQty: number;
    innerOrderDetailCode: string;
    innerOrderDetailMatrixNum: number;
    innerOrderDetailMemo: string;
    innerOrderDetailMoney: number;
    innerOrderDetailName: string;
    innerOrderDetailNum: number;
    innerOrderDetailQty: number;
    innerOrderDetailSpec: string;
    innerOrderDetailStockName: string;
    innerOrderDetailStockNum: number;
    innerOrderDetailUnit: string;
    innerOrderDetailUsePrice: number;
    innerOrderDetailUseQty: number;
    innerOrderDetailUseRate: number;
    innerOrderDetailUseUnit: string;
    innerOrderFid: string;
    innerOrderDetailLotNumber: string;
    itemNum: number;
    itemCostMode: string; //只有在创建单据的才会有，返回的单据中不包含
  }

  interface Order {
    innerOrderType: string;
    branchNum: number;
    branchName: string;
    outBranchNum: number;
    outBranchName: string;
    storehouseNum: number;
    storehouseName: string;
    innerOrderMemo: string;
    innerOrderFid: string;
    innerOrderCreateTime: string;
    innerOrderStateName: string;
    innerOrderStateCode: number;
    innerOrderApproveMemo: string;
    innerOrderReason?: string;
    innerOrderReasonName?: string;
    innerOrderDetails: InternalApply.OrderItem[];
    images?: ImageType[];
  }
}

declare namespace Wholesale {
  interface APIItem extends Global.BaseItem {
    itemTransferRate: number;
    itemTransferUnit: string;
    itemInventoryRate: number;
    itemInventoryUnit: string;
    itemPurchaseRate: number;
    itemPurchaseUnit: string;
    itemWholesaleFlag: boolean;
    itemWholesalePrice: number;
    itemWholesaleUnit: string;
    itemWholesaleRate: number;
    itemProductingDate?: string;
    itemInventoryQty?: number;
    itemBars?: Global.BarCode[];
  }

  interface Item extends APIItem {}

  interface OrderItem {
    itemNum: number;
    itemName: string;
    itemPinyin: string;
    itemCode: string;
    itemSpec: string;
    itemBarcode: string;
    itemBarcodes: string;
    itemUseUnit: string;
    itemUseRate: number;
    itemUseQty: number;
    itemUsePrice: number;
    itemQty: number;
    itemUnit: string;
    itemPrice: number;
    itemMoney: number;
    itemMemo: string;
    orderDetailNum: number;
    itemSaleQty?: number;
    itemAssistUnit?: string;
    itemInventoryQty: number;
  }

  interface Order {
    orderFid: string;
    orderCreator: string;
    orderCreateTime: string;
    orderAuditor: string;
    orderAuditTime: string;
    orderSeller: string;
    regionNum?: number;
    storehouseNum: number;
    storehouseName: string;
    clientFid: string;
    clientName: string;
    orderMemo: string;
    deadline: string;
    orderSaleState: string;
    innerNo?: string;
    state: {
      stateCode: number;
      stateName: string;
    };
    orderTotalMoney?: number;
    details: OrderItem[];
  }

  interface SaleOrderItem extends Omit<OrderItem, 'itemInventoryQty'> {
    itemPresentUnit?: string;
    itemPresentQty?: number;
    itemPresentUseQty?: number;
    preItemUseRate?: number;
    itemLotNumber?: string;
    goods?: Wholesale.Item;
  }

  interface APISaleOrder extends Omit<Order, 'orderFid' | 'deadline' | 'details' | 'orderSaleState'> {
    wholesaleOrderFid: string;
    wholesaleBookFid: string;
    wholesaleOrderTotalMoney?: number;
    details: SaleOrderItem[];
  }

  interface SaleOrder extends Omit<APISaleOrder, 'wholesaleOrderFid'> {
    orderFid: string;
  }

  interface APIOrder {
    wholesaleBookFid: string;
    state: {
      stateCode: number;
      stateName: string;
    };
    clientFid: string;
    clientName: string;
    regionNum?: number;
    storehouseNum: number;
    storehouseName: string;
    wholesaleBookAuditor: string;
    wholesaleBookAuditTime: string;
    wholesaleBookCreator: string;
    wholesaleBookCreateTime: string;
    wholesaleBookMemo: string;
    wholesaleBookSaleState: string;
    wholesaleBookTotalMoney: number;
    wholesaleBookDeadline: string;
    wholesaleBookSeller: string;
    wholesaleBookInnerNo?: string;
    wholesaleBookDetails: Array<{
      bookDetailAssistQty: number;
      bookDetailAssistUnit: string;
      bookDetailIgnore: true;
      bookDetailInventoryQty: number;
      bookDetailItemCode: string;
      bookDetailItemMatrixNum: number;
      bookDetailItemName: string;
      bookDetailItemSpec: string;
      bookDetailItemUnit: string;
      bookDetailMemo: string;
      bookDetailMoney: number;
      bookDetailNoTaxMoney: number;
      bookDetailNum: number;
      bookDetailPeriod: string;
      bookDetailPresentAssistQty: number;
      bookDetailPresentQty: number;
      bookDetailPresentUnit: string;
      bookDetailPresentUseQty: number;
      bookDetailPrice: number;
      bookDetailQty: number;
      bookDetailSaleMoney: number;
      bookDetailSalePresentQty: number;
      bookDetailSaleQty?: number;
      bookDetailStockoutTag: true;
      bookDetailTaxMoney: number;
      bookDetailTaxRate: number;
      bookDetailUsePrice: number;
      bookDetailUseQty: number;
      bookDetailUseRate: number;
      bookDetailUseUnit: string;
      itemPinyin: string;
      itemBarcodes: string;
      itemBarcode: string;
      branchNum: number;
      itemNum: number;
      systemBookCode: string;
    }>;
  }
}

declare namespace Client {
  interface Grade {
    clientGradeName: string;
    clientGradeNum?: number;
  }

  interface Type {
    clientIsEnable: boolean;
    clientTypeCode: string;
    clientTypeName: string;
    clientTypeParentCode?: string;
  }

  interface Employee {
    employeeCode: string;
    employeeName: string;
    employeeNum: number;
  }
}

declare namespace Supplier {
  interface Type {
    supplierCategoryCode: string;
    supplierCategoryEnabled: boolean;
    supplierCategoryName: string;
  }
}

declare namespace Goods {
  interface Item extends Global.BaseItem {
    itemCategory: string;
    itemCategoryCode: string;
    itemRegularPrice: number;
    itemLevel2Price: number;
    itemLevel3Price: number;
    itemLevel4Price: number;
    itemCostPrice: number;
    itemTransferPrice: number;
    itemWholesalePrice: number;
    itemLevel2Wholesale: number;
    itemLevel3Wholesale: number;
    itemLevel4Wholesale: number;
    itemWholesaleRate: number;
    itemWholesaleUnit: string;
    itemTransferRate: number;
    itemTransferUnit: string;
    itemInventoryRate: number;
    itemInventoryUnit: string;
    itemPurchaseRate: number;
    itemPurchaseUnit: string;
    itemPlace: string;
    itemDepartment: string;
    itemType: number;
    itemWeightFlag: boolean;
    itemPointActived: boolean;
    itemDiscounted: boolean;
    itemValidPeriod: number;
    itemMethod: string;
    supplier: Global.Supplier;
  }
}

declare namespace TransferMoney {
  interface Record {
    accountMoveBillNo: string;
    accountMoveBizday: string;
    accountMoveDate: string;
    accountMoveMemo: string;
    accountMoveMoney: number;
    accountMoveNum: number;
    accountMoveOperator: string;
    branchNum: number;
    inAccountBankName: string;
    inAccountBankNo: string;
    inAccountBankNum: number;
    outAccountBankName: string;
    outAccountBankNum: number;
    orderStateCode: number;
    orderStateName: string;
    accountMoveCreator: string;
  }
}

declare namespace Report {
  interface RawData {
    header: string[];
    rows: (string | number)[][];
    summary?: (null | number)[];
  }

  type Row = [string, ...[number, number][]];

  interface CardBox<T> {
    key: T;
    name: string;
    precision?: number;
    [key: string]: any;
  }

  interface Comparison {
    prev: number;
    current: number;
    source: [string | number, number, number][];
  }

  type DateType = '日' | '周' | '月' | '自定义';

  interface Branch {
    branchNum: number;
    branchName: string;
    branchRegionName: string;
    branchRegionNum: number;
    branchType: string;
  }

  interface DataBlock {
    name: string;
    id: number;
    chart: 'pie' | 'bar' | 'line';
    group: string;
    supportItems: boolean;
    parent?: DataBlock;
    children?: DataBlock[];
  }

  interface APIDataBlock {
    dataBlockKey: number;
    dataBlockName: string;
    dataBlockParentKey?: number;
    supportItems?: boolean;
    dataBlockGroup: string;
    privilegeResourceName: string;
  }

  interface SearchedBlock {
    name?: string;
    dataBlockKey: number;
    dataBlockName: string;
    categoryCode?: string;
    itemNum?: number;
  }

  interface BlockData {
    id: number;
    value: number;
    prevValue: number;
  }

  interface DashboardDetail {
    categoryCode?: string;
    columnNum: number;
    dashboardDetailName?: string;
    dashboardDetailNum?: number;
    dashboardId: number;
    dataBlockKey: number;
    itemNum?: number;
    rowNum: number;
  }

  interface Dashboard {
    systemBookCode: number;
    appUserNum: number;
    dashboardCreateTime: string;
    dashboardCreator: string;
    dashboardId: number;
    dashboardName: string;
    dashboardColor: string;
    dashboardIcon: string;
    subscribe: boolean;
    subscribeCount: number;
    systemRoles: Global.Role[];
    details?: DashboardDetail[][];
  }

  interface BranchRankedBlock {
    branchName: string;
    branchNum: number;
    branchRegionName: string;
    branchRegionNum: number;
    compareRank: number;
    dataBlockCompareIntValue: number;
    dataBlockCompareValue: number;
    dataBlockIntValue: number;
    dataBlockValue: number;
    parentRegionNum: number;
    rank: number;
  }
}

declare namespace AnalysisMember {
  interface Data {
    date: string | number;
    newCardCount: number;
    cardConsume: number;
    cardDeposit: number;
    depositCardCount: number;
  }
}

declare namespace AnalysisGoods {
  interface Item {
    itemNum: number;
    itemName: string;
    amount: number;
    money: number;
    discount: number;
  }

  interface Data {
    date: string | number;
    saleDiscount: number;
    saleItemCount: number;
    saleMoney: number;
  }

  interface SortItem {
    key: string | number;
    name: string;
    [field: string]: any;
  }
}

declare namespace AnalysisCategories {
  interface Item {
    categoryCode: string;
    categoryName: string;
    amount: number;
    money: number;
    discount: number;
    subCategoryCodes: string[];
  }
}

declare namespace AnalysisCoupon {
  interface Data {
    sendCount: number;
    sendMoney: number;
    consumeCount: number;
    consumeMoney: number;
    orderMoney: number;
  }

  interface Action {
    actionId: string;
    actionName: string;
    consumeCount: number;
    consumeMoney: number;
    orderMoney: number;
  }
}

declare namespace AnalysisAbnormal {
  interface Data {
    type: string;
    name: string;
    data: Report.Comparison;
    origin: Array<{
      date: number;
      money: number;
      count: number;
    }>;
  }
}

declare namespace AnalaysisProfit {
  interface Data {
    date: string | number;
    profit: number;
    profitRate: number;
    noTaxMoney: number;
    costMoney: number;
    saleMoney: number;
  }
}

declare namespace Signbillreceipt {
  interface BillItem {
    itemName: string;
    itemNum: number;
    itemUnit: string;
    itemPrice: number;
    itemRegularPrice: number;
    itemAmount: number;
    itemMoney: number;
  }
  interface Bill {
    orderNo: string;
    paymentMoney: number;
    paymentBalance: number;
    orderMoney: number;
    paymentTime: string;
    clientName: string;
    orderSoldBy: string;
    discountmoney: number;
    items: BillItem[];
  }
}

declare namespace GoodsSort {
  interface Item {
    itemNum: number;
    itemCode: string;
    itemName: string;
    itemSequence: number;
  }
}
declare namespace MerchantGoodsManage {
  interface Stores {
    stock_locations: Array<MercuryStore>;
  }
  interface MercuryStore {
    id: number;
    name: string;
    branch_name: string;
  }
  interface Variants {
    store_variants: Array<StoreVariants>;
    total_count: number;
  }
  interface StoreVariants {
    id: number;
    stock_quantity: number;
    active: boolean;
    sale_quantity: number;
    current_stock_quantity: number;
    limit_buy_num_per_person: number;
    pos_base_unit_num: number;
    checked?: boolean;
    price: string;
    compare_at_price: string;
    vip_price: string;
    variant: {
      id: number;
      product_id: number;
      name: string;
      spec: string;
      sku: string;
      images: {
        normal_url: string;
      };
      options_text: string;
      option_values: [
        {
          name: string;
        }
      ];
    };
  }
}

declare namespace LemonNews {
  interface News {
    lemengArticles: Array<any>;
  }
  interface New {
    lemengArticleUrl: string;
    lemengArticleId: string;
    lemengArticleState: number;
    lemengArticleDate: string;
    lemengArticleTitle: string;
    lemengArticleType: string;
    lemengArticleContext: string;
    lemengArticleCreator: string;
    lemengArticleMemo: string;
    lemengArticleImageUrl: string;
  }
}

declare namespace Promotion {
  interface Activity {
    policyNo: string;
    policyCreateTime: string;
    policyCreator: string;
    policyAuditTime?: string;
    policyAuditor?: string;
    policyMonActived: boolean;
    policyTuesActived: boolean;
    policyWedActived: boolean;
    policyThursActived: boolean;
    policyFriActived: boolean;
    policySatActived: boolean;
    policySunActived: boolean;
    branchNum: number;
    policyCardOnly: boolean;
    policyPromotionAll: boolean;
    policyPromotionDiscount: number;
    policyPromotionDisablePayDiscount: boolean;
    policyPromotionCardOnce: boolean;
    branchs: { branchNum: number; branchName: string }[];
    policyPromotionType: string;
    policyDateFrom: string;
    policyDateTo: string;
    policyTimeFrom: string;
    policyTimeTo: string;
    policyPromotionTotalLimit?: number;
    state: {
      stateCode: number;
      stateName: string;
    };
  }

  interface Item extends Global.BaseItem {
    itemCostPrice: number;
    itemBranchTransferPrice: number;
    itemBranchSalePrice: number;
    itemTransferPrice: number;
  }

  interface Goods {
    itemCode: string;
    itemGradeName?: string;
    itemGradeNum?: number;
    itemName: string;
    itemNum: number;
    itemUnit: string;
    policyPromotionDetailBillLimit: number;
    policyPromotionDetailCost: number;
    policyPromotionDetailLotNum?: string;
    policyPromotionDetailMemo: string;
    policyPromotionDetailNum: number;
    policyPromotionDetailPolicyLimit: number;
    policyPromotionDetailSpecialPrice: number;
    policyPromotionDetailStdPrice: number;
  }

  interface CardType {
    typeCode: string;
    typeName: string;
  }

  interface ActivityDetail {
    systemBookCode: string;
    branchNum: number;
    policyAuditTime?: string;
    policyAuditor?: string;
    policyCancelOperator?: string;
    policyCancelTime?: string;
    policyCardOnly: boolean;
    policyCreateTime: string;
    policyCreator: string;
    policyDateFrom: string;
    policyDateTo: string;
    policyFriActived: boolean;
    policyMemo: string;
    policyMonActived: boolean;
    policyNo: string;
    policyPromotionAll: boolean;
    policyPromotionCardOnce: boolean;
    policyPromotionDisablePayDiscount: boolean;
    policyPromotionDiscount: number;
    policyPromotionExceptItem: string;
    policyPromotionRepeatEnd: string;
    policyPromotionRepeatType: string;
    policyPromotionType: string;
    policySatActived: boolean;
    policySunActived: boolean;
    policyThursActived: boolean;
    policyTimeFrom: string;
    policyTimeTo: string;
    policyTuesActived: boolean;
    policyWedActived: boolean;
    policyPromotionTotalLimit: number;
    state: {
      stateCode: number;
      stateName: string;
    };
    posItemTypes: {
      posItemTypeCode: string;
      posItemTypeName: string;
    }[];
    branchs: { branchNum: number; branchName: string }[];
    policyPromotionDetails: Goods[];
    cardUserTypes: CardType[];
  }
}

declare namespace ApplyGoods {
  interface Order {
    applyPositemFid: string;
    branchNum: number;
    branchName: string;
    state: {
      stateCode: number;
      stateName: string;
    };
    applyPositemCreator: string;
    applyPositemCreateTime: string;
    applyPositemAuditor?: string;
    applyPositemAuditTime?: string;
    applyPositemMemo: string;
    posItemV2DTO: Item;
  }

  interface Item extends Omit<Goods.Item, 'supplier' | 'itemNum'> {}
}

declare namespace AllPay {
  interface SubAPP {
    app_id: string;
    out_sub_id: string;
    sub_app_id: number;
    sub_app_name: string;
  }

  interface PayType {
    group: string;
    mode: string;
    name: string;
  }

  interface PayLog {
    amount: number;
    app_id: string;
    buyer_pay_amount?: number;
    buyer_user_id: string;
    channel_id: number;
    channel_merchant_no: string;
    channel_name: string;
    fee: number;
    inner_channel_name: string;
    memo: string;
    operator: string;
    order_no: string;
    order_type: string;
    out_sub_id: string;
    pay_end: string;
    pay_id: number;
    pay_start: string;
    pay_state: number;
    pay_type: string;
    receipt_amount?: number;
    refund_amount: number;
    refund_state: number;
    refunded_state: number;
    result: string;
    result_code: number;
    reverse_state: number;
    source: string;
    sub_app_id: number;
    sub_app_name: string;
    transaction_no: string;
  }

  interface RefundLog {
    app_id: string;
    memo: string;
    operator: string;
    pay_id: number;
    refund_amount: number;
    refund_end: string;
    refund_fee: number;
    refund_id: number;
    refund_no: string;
    refund_start: string;
    refund_state: number;
    result: string;
    result_code: number;
    source: string;
    transaction_no: string;
  }

  interface PayLogDetail extends PayLog {
    refund_logs: RefundLog[];
  }
}

declare namespace GroupBuyConfirm {
  interface Goods {
    id: number;
    title: string;
    product_name: string;
    sale_end_time: string;
    is_overtime_refund: boolean;
    overtime_refund_type: number;
    overtime_refund_time: string | null;
    overtime_limit_day: number;
    product_attributes: {
      product_images: {
        id: number;
        base_url: string;
        cdn_url: string;
        small_url: string;
      }[];
    };
    confirm_receive_status: boolean;
    order_total_count: number;
    item_count: number;
    wait_ship_count: number;
    shipped_count: number;
  }

  interface StoreGoods extends Goods {
    confirm_receive_time: string | null;
    store_name: string;
    can_confirm_receive_time: string;
    variants: [
      {
        id: number;
        order_total_count: number;
        item_count: number;
      }
    ];
  }
}
