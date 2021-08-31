import React from 'react';
import styled from 'styled-components';

const StlyedBufferLogoWithWords = styled.div`
  width: 125px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1200px) {
    width: 141px;
  }
`;

function BufferLogoWithWords() {
  return (
    <StlyedBufferLogoWithWords>
      <svg
        width="74"
        height="19"
        viewBox="0 0 74 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 4.23717L8.03416 0L16.1549 4.23717L8.03416 8.48914L0 4.23717ZM48.2324 6.29724V6.19638C48.2324 4.79863 49.0398 4.35193 50.3998 4.4528V1.90229C47.1416 1.70055 45.5975 3.35766 45.5975 6.19638V6.29724H44.1242V8.84775H45.5975V16.5713H48.2324V8.84775H49.7904H50.3998H51.2637V16.5713H53.8986V8.84775H56.066V6.29724H53.8986V6.19638C53.8986 4.79863 54.6918 4.35193 56.066 4.4528V1.90229C52.8079 1.70055 51.2637 3.35766 51.2637 6.19638V6.29724H50.3998H49.7904H48.2324ZM29.8166 9.09245C30.6524 8.41523 31.1623 7.44975 31.1623 6.21054C31.1623 3.80411 29.2358 2.1614 26.8134 2.1614H21.1896V16.5423H27.2667C29.7457 16.5423 31.7289 14.8419 31.7289 12.3779C31.7006 10.8937 30.964 9.75529 29.8166 9.09245ZM26.8276 4.8272C27.7342 4.8272 28.3575 5.50446 28.3575 6.41227C28.3575 7.32007 27.7058 7.99735 26.8276 7.99735H24.0085V4.8272H26.8276ZM27.2526 13.9053H24.0085V10.519H27.2526C28.2159 10.519 28.9099 11.2395 28.9099 12.2049C28.9099 13.1848 28.2159 13.9053 27.2526 13.9053ZM39.9451 6.28238V11.8301C39.9451 13.617 38.9819 14.3807 37.6928 14.3807C36.5029 14.3807 35.667 13.6601 35.667 12.2624V6.28238H33.0322V12.5939C33.0322 15.3317 34.7179 16.8447 36.8995 16.8447C38.2736 16.8447 39.336 16.3259 39.931 15.4037V16.5565H42.5658V6.28238H39.9451ZM66.9877 12.5076H59.2818C59.6643 13.8622 60.7691 14.4385 62.1433 14.4385C63.1773 14.4385 63.9991 14.0063 64.4379 13.4155L66.563 14.6403C65.614 16.038 64.084 16.845 62.1147 16.845C58.6867 16.845 56.5194 14.4818 56.5194 11.4125C56.5194 8.34328 58.7008 5.98006 61.9167 5.98006C64.934 5.98006 67.0873 8.38647 67.0873 11.4125C67.0873 11.816 67.0445 12.1618 66.9877 12.5076ZM61.9167 8.38647C60.4997 8.38647 59.5367 9.15023 59.2391 10.4615H64.4519C64.1262 8.97726 63.0214 8.38647 61.9167 8.38647ZM70.8977 8.05523V6.28286H68.2629V16.557H70.8977V11.6432C70.8977 9.48178 72.6258 8.86218 74 9.03509V6.08108C72.7113 6.08108 71.422 6.6575 70.8977 8.05523ZM8.03416 15.7599L2.55304 12.7337L0 14.1388L8.03416 18.57L16.1549 14.1388L13.573 12.7337L8.03416 15.7599ZM2.55304 7.95856L8.03416 10.7029L13.573 7.95856L16.1549 9.23926L8.03416 13.2643L0 9.23926L2.55304 7.95856Z"
          fill="black"
        />
      </svg>
    </StlyedBufferLogoWithWords>
  );
}

export default BufferLogoWithWords;
