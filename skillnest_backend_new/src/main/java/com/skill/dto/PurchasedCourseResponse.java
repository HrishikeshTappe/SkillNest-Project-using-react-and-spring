package com.skill.dto;

public class PurchasedCourseResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String courseName;
    private String amount;
    private String purchaseDate;
    private String paymentStatus;

    // full constructor (used in controller above)
    public PurchasedCourseResponse(Long id, Long userId, String userName,
                                   String courseName, String amount,
                                   String purchaseDate, String paymentStatus) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.courseName = courseName;
        this.amount = amount;
        this.purchaseDate = purchaseDate;
        this.paymentStatus = paymentStatus;
    }

    // getters + setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(String purchaseDate) { this.purchaseDate = purchaseDate; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
}
