import React from "react";

const StatusBadge = ({ status }) => {
    let badgeColor = "";
    let badgeText = "";
    let textColor = "";

    switch (status) {
    case "pending":
        badgeColor = "#fbe1a7"; // Warna untuk status pending
        badgeText = "PROSES";
        textColor = "#B78820"; // Teks untuk status pending
        break;
    case "approved":
        badgeColor = "#C9F7F5"; // Warna untuk status approved
        badgeText = "SUKSES";
        textColor = "#1BC5BD"; // Teks untuk status approved
        break;
    case "rejected":
        badgeColor = "#F09696"; // Warna untuk status rejected
        badgeText = "DITOLAK";
        textColor = "#5E3C3C"; // Teks untuk status rejected
        break;
    case "rejected-b":
        badgeColor = "#F09696"; // Warna untuk status rejected
        badgeText = "PENDING";
        textColor = "#5E3C3C"; // Teks untuk status rejected
        break;
    default:
        badgeColor = "gray"; // Warna default jika status tidak dikenali
        badgeText = "Unknown"; // Teks default jika status tidak dikenali
        break;
    }

    const badgeStyle = {
        backgroundColor: badgeColor,
        fontWeight: "500",
        fontSize: "smaller",
        color: textColor,
        padding: "5px 10px",
        borderRadius: "4px",
    };

    return <span style={badgeStyle}>{badgeText}</span>;
};

export default StatusBadge;
