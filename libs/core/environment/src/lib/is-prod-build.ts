import { environment } from './environments/environment';

/**
 * Use this when you want to make use of Webpacks optimizations features
 * and drop logic from the final production bundle.
 *
 * Please note that this *can* also be true in the development (not local) environment.
 */
export const IS_PROD_BUILD = environment.production_build;
