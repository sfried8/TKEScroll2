export const TYPES = {
    BROTHER: "BROTHER",
    SWEETHEART: "SWEETHEART",
    LITTLESISTER: "LITTLESISTER",
    HONORARY: "HONORARY"
};
export const PrettyType = {
    [TYPES.BROTHER]: "Brother",
    [TYPES.SWEETHEART]: "Sweetheart",
    [TYPES.LITTLESISTER]: "Little Sister",
    [TYPES.HONORARY]: "Honorary"
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
export const PrettyAchievement = {
    [ACHIEVEMENTS.KNIGHT]: "Knight of Classic Lore",
    [ACHIEVEMENTS.ORDER]: "Order of the Founders"
}