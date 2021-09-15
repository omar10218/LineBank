export interface CaseParams {
  applno: string;
  search: string;
  cuid: string;
  fds: string;
  queryDate: string;
}

export interface OptionsCode{
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

interface EmpItems{
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
