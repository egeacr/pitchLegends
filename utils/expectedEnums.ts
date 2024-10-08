export enum pageTitle {
    HOMEPAGE = "Home | Pitchlegends",
    REGISTERPAGE = "Register - Pitch Legends",
    TEAM_NAME = "Home - Pitch Legends"
}

export enum pageURL {
    HOMEPAGE = "https://pitchlegends.com/",
    REGISTERPAGE = "https://play.pitchlegends.com/auth/register"
}

export enum unsuccessfulLoginCredentials {
    MAIL = 'test@testcompany.com',
    PASSWORD = 'invalidPassword123.',
    MAIL_WITHOUT_CHAR = 'test',
    EMPTY_MAIL = '',
    EMPTY_PASSWORD = ''
}

export enum successfulLoginCredentials {
    MAIL = 'foetestuser@gmail.com',
    PASSWORD = 'pitchLegends',
    GOOGLE_MAIL_PASSWORD = 'FarukOnurEge1.'
}

export enum registerPageErrorMessages {
    EXISTING_MAIL = 'The email has already been taken.'
}

export enum loginPageInputErrorMessages {
    EMPTY_FIELD_TR = 'Lütfen bu alanı doldurun.',
    EMPTY_FIELD_EN = 'Please fill out this field.',
    EMPTY_FIELD = 'Fill out this field',
    EMAIL = 'Enter an email address',
    EMAIL_ = 'Please enter an email address.',
    SPECIAL_CHARACTER_TR = 'Lütfen e-posta adresine bir "@" işareti ekleyin.',
    SPECIAL_CHARACTER_EN = 'Please include an "@" sign in the email address.'
}

export enum introductionPageTexts {
    headerText = "Face Julius In Your Tutorial!"
}