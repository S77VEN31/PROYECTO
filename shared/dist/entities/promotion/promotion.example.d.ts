/**
 * @fileoverview Example usage of Promotion types
 * Demonstrates data modeling with promotion objects
 */
import { Promotion, PromotionCreate, PromotionUpdate } from "../../entities";
/**
 * Example of a discount promotion creation model
 */
declare const discountPromotionModel: PromotionCreate;
/**
 * Example of a BOGO (Buy One Get One) promotion creation model
 */
declare const bogoPromotionModel: PromotionCreate;
/**
 * Example of a complete promotion model as stored in the database
 */
declare const promotionModel: Promotion;
/**
 * Example of a promotion update model
 */
declare const promotionUpdateModel: PromotionUpdate;
/**
 * Example of a seasonal promotion model
 */
declare const seasonalPromotionModel: PromotionCreate;
export { bogoPromotionModel, discountPromotionModel, promotionModel, promotionUpdateModel, seasonalPromotionModel, };
//# sourceMappingURL=promotion.example.d.ts.map