export const TYPES = {
    ALL: "ALL",
    BROTHER: "BROTHER",
    SWEETHEART: "SWEETHEART",
    LITTLESISTER: "LITTLESISTER",
    HONORARY: "HONORARY"
};

export const ROLES = {
    BROTHER: "BROTHER",
    HISTOR: "HISTOR",
    GUEST: "GUEST"
};

export const OFFICERS = {
    PRYTANIS: "PRYTANIS",
    EPIPRYTANIS: "EPIPRYTANIS",
    GRAMMATEUS: "GRAMMATEUS",
    CRYSOPHYLOS: "CRYSOPHYLOS",
    HISTOR: "HISTOR",
    HYPOPHETES: "HYPOPHETES",
    PYLORTES: "PYLORTES",
    HEGEMON: "HEGEMON",
    RECRUITMENT: "RECRUITMENT"
}
export function getOfficerName(officer) {
    const officerName = OFFICERS[officer.toUpperCase()];
    return officerName.charAt(0).toUpperCase() + officerName.substring(1).toLowerCase() + (officer === OFFICERS.RECRUITMENT ? " Chairman" : "");
}

export const ACHIEVEMENTS = {
    KNIGHT: "KNIGHT",
    ORDER: "ORDER",

}