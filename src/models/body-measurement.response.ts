export interface BodyMeasurementResponse {
  id: string
  readingDateTime: string
  bodyMassKg: number | null
  bmi: number | null
  bodyFatPercentage: number | null
  bodyMusclePercentage: number | null
  bodyWaterPercentage: number | null
  boneMassKg: number | null
}