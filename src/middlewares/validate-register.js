const { check, validationResult  } = require('express-validator');

const validateRegister = [
    check('name').notEmpty().withMessage('Debe ingresar nombre de usuario').bail()
    .isLength({min:5}).withMessage('Nombre demasiado corto'),

    check('lastname').notEmpty().withMessage('Debe ingresar apellido de usuario').bail(),

    check('email').notEmpty().withMessage('Debe ingresar email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    check('password').notEmpty().withMessage('Debe ingresar password').bail()
    .isLength({min:8}).withMessage('Contraseña demasiado corta'),
    
    check('confirm_password').notEmpty().withMessage('Debe confirmar password').bail(),

    check('photo').custom((value, {req})=>{
        let file = req.file
        if(!file){
            throw new Error('Debes subir una foto de perfil')
        }
        return true
    }),

   
]

const validationErrors = ( req, res, next ) => {

    console.log(req.body)
    const errors = validationResult(req);
    if(errors.isEmpty()){
        // No hay errores
        return next()
    }

    res.render('register', {
        old: req.body,
        
        errors: errors.mapped() 
    })


}

module.exports ={validateRegister ,validationErrors}