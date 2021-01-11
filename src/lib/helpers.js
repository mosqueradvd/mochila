import { IDENTIFICATION_TYPES } from 'lib/constans'

export const getIdentificationTypeById = (identificationTypeId) => {
  return IDENTIFICATION_TYPES.find(({ key }) => key === identificationTypeId)
}
