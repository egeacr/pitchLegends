import {faker} from "@faker-js/faker"

export class fakerFunctions {

    static generateEmail() {
        return faker.internet.email()
    }

    static generateName() {
        return faker.person.fullName()
    }

    static generatePassword() {
        return faker.internet.password()
    }

}