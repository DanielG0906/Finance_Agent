import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginHorizontal: 0,
        marginBottom:0,
        marginTop:25,
        gap:32,
    },
    logo: {
        width: 130,       // תופס 90% מרוחב המסך (במקום מספר קבוע שחורג)
        maxWidth: 400,      // מגביל שלא יהיה ענק בטאבלטים
        height: 90,         // גובה קבוע
        borderRadius: 20,   // בדיוק חצי מהגובה (90/2) כדי ליצור עיגול מושלם בקצוות
        overflow: 'hidden', // חובה! חותך את התמונה כדי שהפינות באמת יהיו עגולות
    },
    profile:{
        width: 50,
        height: 50,
    },

    gender:{
        width: 30,
        height: 30,
        marginRight:10,

    }
});
