import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="IconWrapperUI">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 190 190"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <path d="M95 190c-25.375 0-49.232-9.882-67.175-27.825C9.882 144.232 0 120.375 0 95s9.882-49.232 27.825-67.175C45.768 9.882 69.625 0 95 0s49.232 9.882 67.175 27.825C180.118 45.768 190 69.625 190 95s-9.882 49.232-27.825 67.175C144.232 180.118 120.375 190 95 190zm0-178.867c-22.402 0-43.462 8.724-59.303 24.564C19.857 51.537 11.133 72.598 11.133 95c0 22.402 8.724 43.462 24.564 59.303 15.84 15.841 36.901 24.564 59.303 24.564 22.402 0 43.462-8.723 59.303-24.564 15.841-15.841 24.564-36.901 24.564-59.303 0-22.402-8.723-43.462-24.564-59.303C138.462 19.857 117.402 11.133 95 11.133z" />
          <path d="M89.434 22.279h11.132v14.856H89.434V22.279zM131.962 50.157l10.503-10.503 7.871 7.87-10.503 10.504-7.871-7.871zM152.866 89.434h14.855v11.132h-14.855V89.434zM131.952 139.853l7.871-7.871 10.503 10.503-7.871 7.871-10.503-10.503zM89.434 152.865h11.132v14.856H89.434v-14.856zM39.624 142.475l10.503-10.503 7.87 7.871-10.502 10.503-7.871-7.871zM22.279 89.434h14.856v11.132H22.279V89.434zM39.633 47.515l7.87-7.871 10.504 10.503-7.871 7.87-10.503-10.502zM134.296 100.566H89.434V55.704h11.132v33.73h33.73v11.132z" />
        </g>
      </svg>
    </span>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent