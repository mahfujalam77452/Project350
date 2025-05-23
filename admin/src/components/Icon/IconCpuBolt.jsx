import React from 'react';

const IconCpuBolt = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M7 10C7 8.58579 7 7.87868 7.43934 7.43934C7.87868 7 8.58579 7 10 7H14C15.4142 7 16.1213 7 16.5607 7.43934C17 7.87868 17 8.58579 17 10V14C17 15.4142 17 16.1213 16.5607 16.5607C16.1213 17 15.4142 17 14 17H10C8.58579 17 7.87868 17 7.43934 16.5607C7 16.1213 7 15.4142 7 14V10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path d="M12.4286 10L11 12H13L11.5714 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path opacity={duotone ? '0.5' : '1'} d="M4 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M22 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M4 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M22 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M4 15H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M22 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M12 20L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M12 2L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M9 20L9 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M9 2L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M15 20L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity={duotone ? '0.5' : '1'} d="M15 2L15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M9.18091 9.18091C9.23402 9.1278 9.32886 9.06211 9.63147 9.02143C9.95415 8.97804 10.3921 8.97656 11.0696 8.97656H12.9301C13.6075 8.97656 14.0455 8.97804 14.3682 9.02143C14.6708 9.06211 14.7656 9.1278 14.8187 9.18091C14.8718 9.23402 14.9375 9.32886 14.9782 9.63147C15.0216 9.95415 15.0231 10.3921 15.0231 11.0696V12.9301C15.0231 13.6075 15.0216 14.0455 14.9782 14.3682C14.9375 14.6708 14.8718 14.7656 14.8187 14.8187C14.7656 14.8718 14.6708 14.9375 14.3682 14.9782C14.0455 15.0216 13.6075 15.0231 12.9301 15.0231H11.0696C10.3921 15.0231 9.95415 15.0216 9.63147 14.9782C9.32886 14.9375 9.23402 14.8718 9.18091 14.8187C9.1278 14.7656 9.06211 14.6708 9.02143 14.3682C8.97804 14.0455 8.97656 13.6075 8.97656 12.9301V11.0696C8.97656 10.3921 8.97804 9.95415 9.02143 9.63147C9.06211 9.32886 9.1278 9.23402 9.18091 9.18091Z"
                        fill="currentColor"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.6977 2.69767C12.6977 2.31236 12.3853 2 12 2C11.6147 2 11.3023 2.31236 11.3023 2.69767V5.48837C10.7916 5.48944 10.3283 5.49342 9.90678 5.50495L9.90698 5.48837V2.69767C9.90698 2.31236 9.59462 2 9.2093 2C8.82399 2 8.51163 2.31236 8.51163 2.69767V5.48837C8.51163 5.52487 8.51443 5.56072 8.51984 5.5957C7.58381 5.71067 6.93517 5.94879 6.44198 6.44198C5.94879 6.93517 5.71067 7.58381 5.5957 8.51984C5.56071 8.51443 5.52487 8.51163 5.48837 8.51163H2.69767C2.31236 8.51163 2 8.82399 2 9.2093C2 9.59462 2.31236 9.90698 2.69767 9.90698H5.48837C5.49342 10.3283 5.48944 10.7916 5.48837 11.3023V14.6977C5.48944 15.2084 5.49342 15.6717 5.50495 16.0932H5.48837V18.8284C5.48837 19.2137 5.80073 19.5261 6.18504 19.5261C6.56935 19.5261 6.88171 19.2137 6.88171 18.8284V16.0932C7.37188 16.0931 7.84671 16.0933 8.30864 16.0946L8.30853 16.0932V18.8284C8.30853 19.2137 8.62089 19.5261 9.0052 19.5261C9.38951 19.5261 9.70187 19.2137 9.70187 18.8284V16.0932C10.2096 16.0926 10.7007 16.0925 11.2162 16.0932L11.2164 18.8284C11.2164 19.2137 11.5287 19.5261 11.913 19.5261C12.2973 19.5261 12.6097 19.2137 12.6097 18.8284V16.0932C12.9268 16.0933 13.381 16.0935 13.7805 16.0945L13.7804 16.0932V14.6977C13.7804 14.3124 13.468 14 13.0827 14C12.6974 14 12.385 14.3124 12.385 14.6977C12.385 15.0829 12.6974 15.3953 13.0827 15.3953C13.468 15.3953 13.7804 15.0829 13.7804 14.6977V12.9301C13.7804 12.545 13.468 12.2326 13.0827 12.2326C12.6974 12.2326 12.385 12.545 12.385 12.9301C12.385 13.3154 12.6974 13.6278 13.0827 13.6278C13.468 13.6278 13.7804 13.3154 13.7804 12.9301V11.0696C13.7804 10.6843 13.468 10.3719 13.0827 10.3719C12.6974 10.3719 12.385 10.6843 12.385 11.0696C12.385 11.4549 12.6974 11.7673 13.0827 11.7673C13.468 11.7673 13.7804 11.4549 13.7804 11.0696V9.2093C13.7804 8.82399 13.468 8.51163 13.0827 8.51163C12.6974 8.51163 12.385 8.82399 12.385 9.2093C12.385 9.59462 12.6974 9.90698 13.0827 9.90698C13.468 9.90698 13.7804 9.59462 13.7804 9.2093C13.7804 8.82399 13.468 8.51163 13.0827 8.51163C12.6974 8.51163 12.385 8.82399 12.385 9.2093C12.385 9.59462 12.6974 9.90698 12.6977 9.90698Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};

export default IconCpuBolt;
