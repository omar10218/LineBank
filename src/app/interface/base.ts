export interface CaseParams {
  applno: string;
  search: string;
  cuid: string;
  fds: string;
  queryDate: string;
}

export interface OptionsCode {
  value: string;
  viewValue: string;
}

interface MappingCode {
  codeNo: string;
  codeDesc: string;
  codeType: string;
  codeSort: string;
  codeTag: string;
  codeFlag: string;
}

export interface Mapping {
  rspBody: {
    mappingList: MappingCode[];
  };
}

export interface SysCode {
  rspBody: {
    codeNo: string;
    codeDesc: string;
    codeType: string;
    codeSort: string;
    codeTag: string;
    codeFlag: string;
  };
}

export interface Employee extends CommonRes {
  rspBody: {
    empList: EmpItems[];
    levelTypeList: MappingCode[];
    projectList: MappingCode[];
    roleList: RoleItem[];
    ynList: MappingCode[];
  };
}

export interface CommonRes {
  rspCode: string;
  rspMsg: string;
}

interface EmpItems {
  agentEmp: string;
  assignProjectno: string;
  assignStop: string;
  email: string;
  empId: string;
  empName: string;
  empNo: string;
  leaveEnddate: string;
  leaveEnddateType: string;
  leaveStartdate: string;
  leaveStartdateType: string;
}

export interface RoleItem {
  roleNo: string;
  roleName: string;
  roleAmt: string;
}

export enum JCICCode {
  KCM012 = 'KCM012',
  DAM001 = 'DAM001',
  BAM061 = 'BAM061',
  KRM043 = 'KRM043',
  BAM062 = 'BAM062',
  VAM020 = 'VAM020',
  VAM201 = 'VAM201',
  VAM106 = 'VAM106',
  VAM107 = 'VAM107',
  VAM108 = 'VAM108',
  BAM029 = 'BAM029',
  BAM501 = 'BAM501',
  BAM502 = 'BAM502',
  BAM504 = 'BAM504',
  BAM505 = 'BAM505',
  BAM032 = 'BAM032',
  BAM067 = 'BAM067',
  BAM070 = 'BAM070',
  BAM101 = 'BAM101',
  BAM421 = 'BAM421',
  BAM305 = 'BAM305',
  BAM306 = 'BAM306',
  BAM307 = 'BAM307',
  BAM608 = 'BAM608',
  KRM046 = 'KRM046',
  KRM048 = 'KRM048',
  STM022 = 'STM022',
  STM008 = 'STM008',
  STM025 = 'STM025',
  BAM033 = 'BAM033',
  BAM034 = 'BAM034',
  BAS010 = 'BAS010'
}

export interface JCICTable {
  dataList: DataItem[];
  title: string;
  nzScroll: string;
}

export interface DataItem {
  name: string;
  bodyKey: string;
  width?: string;
  nzScroll?: string;
  nzLeft?: boolean;
  nzRight?: boolean;
}

export interface history {
  value: string; //currentValue
  tableName: string; //tableName
  valueInfo: string; //columnName
}
