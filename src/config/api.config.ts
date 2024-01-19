import { registerAs } from '@nestjs/config'
import Joi from 'joi'
export const apiConfig = () =>
  registerAs('api', () => {
    const values = {
      shortenerBaseUrl: process.env.SHORTENER_BASE_URL
    }

    const schema = Joi.object({
      shortenerBaseUrl: Joi.string().required()
    })

    const { error } = schema.validate(values, { abortEarly: false })

    if (error) {
      throw new Error(error.message)
    }

    return values
  })
