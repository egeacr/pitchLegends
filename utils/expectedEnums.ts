export enum pageTitle {
    HOMEPAGE = "Home | Pitchlegends",
    REGISTERPAGE = "Register - Pitch Legends",
    TEAM_NAME = "Make your Team Name - Pitch Legends"
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
    PASSWORD = 'pitchLegends'
}

export enum registerPageErrorMessages {
    EXISTING_MAIL = 'The email has already been taken.'
}

export enum loginPageInputErrorMessages {
    EMPTY_FIELD_TR = 'Lütfen bu alanı doldurun.',
    EMPTY_FIELD_EN = 'Please fill this field.',
    SPECIAL_CHARACTER_TR = 'Lütfen e-posta adresine bir "@" işareti ekleyin.',
    SPECIAL_CHARACTER_EN = 'Please include an "@" sign in the email address.'
}