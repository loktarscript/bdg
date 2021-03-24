module.exports = {
    showAll: 'call BDG_BONDING_SELECT_ALL',
    showOne: 'call BDG_BONDING_SELECT_ONE(?)',
    insertBonding: 'call BDG_BONDING_INSERT(?,?,?,?,?,?,?)',
    updateBonding: 'call BDG_BONDING_UPDATE(?,?,?,?,?,?,?,?)',
    deleteBonding: 'call BDG_BONDING_DELETE(?)',
    valEmail : 'call VALIDATE_EMAIL_BONDING(?,  @v_respuesta)',
    actualizarPassword: 'call RESET_PASSWORD_BONDING(?,?)'
}