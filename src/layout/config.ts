type NavItem = {
    preIcon: string;
    title: string;
    value: string; // Router name
}
export const navList: NavItem[] = [
    { preIcon: 'mdi-view-dashboard', title: '工作台', value: 'Home' },
    { preIcon: 'mdi-playlist-check', title: '计划', value: 'PlanList'},
    { preIcon: 'mdi-briefcase-edit-outline', title: '病例', value: 'CaseList'},
    { preIcon: 'mdi-message-outline', title: '问答', value: 'Chat'}
]