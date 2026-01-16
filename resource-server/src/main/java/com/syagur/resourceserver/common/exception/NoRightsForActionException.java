package com.syagur.resourceserver.common.exception;

public class NoRightsForActionException extends RuntimeException {

    public NoRightsForActionException(String message) {
        super(message);
    }

}
