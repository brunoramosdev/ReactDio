import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    background: #565656;
    border-radius: 22px;
    position: relative;

    color: #ffffff;
    paddding: 2px 12px;
    min-width: 128px;
    width:100%;

    &:hover{
        opacity: 0.6;
        cursor:pointer;
    }

    ${({variant}) => variant !== "primary" && css`
        min-width: 167px;
        height: 33px;

        background: #E41050;

        &:hover{
            opacity: 0.6;
            cursor:pointer;
        }

        &::after {
            content: '',
            position: absolute;
            border: 1px solid #e41050;
            top: -5px;
            left: -6px;
            width: calc(100% - 10px);
            height: calc(100% + 10px);
            border-radius: 22px;
        }
    `}
`
