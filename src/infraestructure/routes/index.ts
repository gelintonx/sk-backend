import { Router } from "express";

const router: Router = Router();

// Controllers

// Attestation Controllers
import startAttestationController from '../controllers/User/Attestation/StartAttestationController';
import verifyAttestationController from '../controllers/User/Attestation/VerifyAttestationController';

// Assertion Controllers
import startAssertionController from '../controllers/User/Assertion/StartAssertionController';
import verifyAssertionController from '../controllers/User/Assertion/VerifyAssertionController';

import createPostController from '../controllers/Post/create_post_controller';




// Attestation (A.K.A Register)

router.post('/create-challenge-attestation',startAttestationController.handle);

router.post('/verify-challenge-attestation', verifyAttestationController.handle);

// Assertion (A.K.A Login)

router.post('/create-challenge-assertion',startAssertionController.handle);
router.post('/verify-challenge-assertion',verifyAssertionController.handle)

//router.post('/save-user',saveUserController.handle);


// Assertion (A.K.A Login)



// Post

router.post('/create-post',createPostController.handle);



export default router;