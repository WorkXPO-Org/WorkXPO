package com.workxpo.backend.model.enums;

public enum Category {

    HEALTH("Saúde"),
    MARKETING("Marketing"),
    TECHNOLOGY("Tecnologia"),
    LITERATURE("Literatura"),
    INDUSTRY("Indústria"),
    INFRASTRUCTURE("Infraestrutura");

    private final String displayValue;

    Category(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }
}
