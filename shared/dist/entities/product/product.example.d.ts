/**
 * @fileoverview Example usage of Product types
 * Demonstrates data modeling with product objects
 */
import { NutritionalInfo, Product, ProductCreate, ProductUpdate } from "../../entities";
/**
 * Example of a nutritional information model
 */
declare const nutritionalInfoModel: NutritionalInfo;
/**
 * Example of a product creation model
 */
declare const newProductModel: ProductCreate;
/**
 * Example of a complete product model as stored in the database
 */
declare const productModel: Product;
/**
 * Example of a product update model
 */
declare const productUpdateModel: ProductUpdate;
/**
 * Example of a product with minimal properties
 */
declare const minimalProductModel: ProductCreate;
export { minimalProductModel, newProductModel, nutritionalInfoModel, productModel, productUpdateModel, };
//# sourceMappingURL=product.example.d.ts.map