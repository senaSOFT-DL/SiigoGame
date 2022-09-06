//Stylized components for passing properties directly from the component
import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    gap: 1em;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${props => props.bgImage}) no-repeat center center / cover;
`;

