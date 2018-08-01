import * as Model from '../store/AuthorModel'

const companyService = {}
companyService.getCompany = (where) => Model.Company.findOne({where})
export default companyService
