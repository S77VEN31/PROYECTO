/**
 * @fileoverview Example usage of Category types
 * Demonstrates data modeling with category objects
 */
import { Category, CategoryCreate, CategoryUpdate } from "../../entities";
/**
 * Example of a category creation model
 */
declare const newCategoryModel: CategoryCreate;
/**
 * Example of a complete category model as stored in the database
 */
declare const categoryModel: Category;
/**
 * Example of a category update model
 */
declare const categoryUpdateModel: CategoryUpdate;
/**
 * Example of a category with all optional properties
 */
declare const minimalCategoryModel: CategoryCreate;
export { categoryModel, categoryUpdateModel, minimalCategoryModel, newCategoryModel, };
//# sourceMappingURL=category.example.d.ts.map