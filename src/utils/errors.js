
export class AuthrizationError extends Error {
    constructor(status, message){
        super()
        this.name = 'AuthrizationError'
        this.status = status
        this.message = message
    }
}
export class InternalServerError extends Error {
    constructor(status, message){
        super()
        this.name = 'InternalServerError'
        this.status = status
        this.message = message
    }
}
export class ValidationError extends Error {
    constructor(status, message){
        super()
        this.name = 'ValidationError'
        this.status = status
        this.message = message
    }
}
export class ForbiddenError extends Error {
    constructor(status, message){
        super()
        this.name = 'ForbiddenError'
        this.status = status
        this.message = message
    }
}
export class NotFoundError extends Error {
    constructor(status, message){
        super()
        this.name = 'NotFound'
        this.status = status
        this.message = message
    }
}
export class AlredExistsError extends Error {
    constructor(status, message){
        super()
        this.name = 'AlredExistsError'
        this.status = status
        this.message = message
    }
}
export class CannotAddToGroup extends Error {
    constructor(status, message){
        super()
        this.name = 'CannotAddToGroup'
        this.status = status
        this.message = message
    }
}
export class CannotDeleteFromGroup extends Error {
    constructor(status, message){
        super()
        this.name = 'CannotDeleteFromGroup'
        this.status = status
        this.message = message
    }
}

