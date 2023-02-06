import { InlineLoader } from 'components/ui';
import styled from 'styled-components';


export const WalletSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 30px 30px 30px;
`

export const WalletBalanceStyles = styled.span`
  display: inline-block;
  margin-left: 10px;
`

export const WalletWrapperStyles = styled.span`
  margin-right: 20px;
  display: inline-flex;
  align-items: center;
`

export const WalledBalanceLoaderStyle = styled(InlineLoader)`
  width: 60px;
`;

export const DecoratorLabelStyle = styled.span`
  display: inline-block;
  font-size: 30px;
  line-height: 39px;
  font-weight: 600;
  margin-left: 15px;
`;

export const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

export const ButtonWrapper = styled.div`
  padding: 30px 30px 0 30px;
`;

export const HalfColumn = styled.div`
  width: 48%;
  display: inline-block;
  padding: 1%;
`;

export const CreateBountyTitle = styled.div`
  position: absolute;
  margin-left: 30px;
  font-size: 2em;
  font-weight: bold;
`;