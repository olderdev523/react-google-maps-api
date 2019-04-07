// eslint-disable @typescript-eslint/no-non-null-assertion
import * as React from 'react'
import { render, cleanup } from "react-testing-library"
import GoogleMap from  "../../GoogleMap"
import Circle, { CircleProps } from '../../components/drawing/Circle'

const CENTER = {
  lat: 0,
  lng: 0
}

let instance: google.maps.Circle | null

function onCircleLoad(circle: google.maps.Circle) {
  instance = circle
}

function getCircle(props: CircleProps) {
  return <GoogleMap><Circle {...props} /></GoogleMap>
}

afterEach(() => {
  cleanup()
  instance = null
})

describe('Circle', () => {
  it('should call onLoad only once', () => {
    const onLoadMock = jest.fn()
    render(getCircle({
      center: CENTER,
      radius: 1,
      onLoad: onLoadMock
    }))

    expect(onLoadMock).toBeCalledTimes(1)
  })

  it('should call onLoad when loading with instance', () => {
    render(getCircle({
      center: CENTER,
      radius: 1,
      onLoad: onCircleLoad
    }))

    expect(instance!).toHaveProperty("setCenter")
  })

  it('should do something', () => {
    const { rerender} = render(getCircle({
      center: CENTER,
      radius: 1,
      onLoad: onCircleLoad
    }))


    rerender(getCircle({
      center: CENTER,
      radius: 2,
      onLoad: onCircleLoad
    }))

    expect(instance!.setRadius).toBeCalledWith(2)
  })
  
})
