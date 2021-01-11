import { IDENTIFICATION_TYPES, ROLES_TYPES } from 'lib/constans'

export const getIdentificationTypeById = (identificationTypeId) => {
  return IDENTIFICATION_TYPES.find(({ key }) => key === identificationTypeId)
}

export const getRolesTypeById = (rolesTypeId) => {
  return ROLES_TYPES.find(({ key }) => key === rolesTypeId)
}
