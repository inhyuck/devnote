/**
 * describe() 함수는 여러 개의 테스트를 그룹화하는 블록을 생성한다.
 */
const myAnimal = {
    gender: 'female',
    type: 'cat family',
};

describe('나의 동물은', () => {
    test('암컷이다.', () => {
        expect(myAnimal.gender)
            .toBe('female');
    });

    test('고양이과이다.', () => {
        expect(myAnimal.type)
            .toBe('cat family');
    });
});

/**
 * 매처는 값이 특정 조건을 만족하는지 검증할 수 있는 일종의 집합이다.
 * - 직관적이어서 테스트의 의도를 쉽게 파악할 수 있다.
 */
//toBe() 원시 값의 일치 여부를 확인하거나 객체의 참조를 확인한다.
it('1 + 2 = 3과 동일하다', () => {
    expect(1 + 2)
        .toBe(3);
});

//toEqual() 모든 프로퍼티의 값을 재귀적으로 비교하여 일치하는지 검증한다.
const car1 = {
    name: 'sonata',
    options: {
        color: 'grey',
    },
};
const car2 = {
    name: 'sonata',
    options: {
        color: 'grey',
    },
};
it('자동차는 동일한 옵션을 가지고 있다.', () => {
    expect(car1)
        .toEqual(car2);
});

//toHaveBeenCalled() spy를 사용하여 특정 함수가 정상적으로 호출되었는지 검증한다.
describe('spy', () => {
    let foo, bar;

    beforeEach(() => {
        foo = {
            setBar(value) {
                bar = value;
            },
        };

        jest.spyOn(foo, 'setBar');

        foo.setBar();
    });

    it('호출 여부를 관리한다.', () => {
        expect(foo.setBar)
            .toHaveBeenCalled();
    });
});

//toHaveBeenCalledWith() toHaveBeenCalled()와 유사하지만 함수에 어떠한 인자가 넘어가 실행되었는지 함께 검증합니다.
describe('spy', () => {
    let foo, bar;

    beforeEach(() => {
        foo = {
            setBar(value) {
                bar = value;
            },
        };

        jest.spyOn(foo, 'setBar');

        foo.setBar(123);
    });

    it('호출될 때 인자를 기록한다.', () => {
        expect(foo.setBar)
            .toHaveBeenCalledWith(123);
    });
});

//toHaveBeenCalledTimes() toHaveBeenCalled()와 유사하지만 함수가 정확히 몇 번 호출되었는지 확인한다.
describe('spy', () => {
    let foo, bar;

    beforeEach(() => {
        foo = {
            setBar(value) {
                bar = value;
            },
        };

        jest.spyOn(foo, 'setBar');

        foo.setBar();
        foo.setBar();
    });

    it('호출횟수를 기록한다.', () => {
        expect(foo.setBar)
            .toHaveBeenCalledTimes(2);
    });
});

//toHaveProperty() 객체의 특정 키 값에 해당하는 프로퍼티의 값을 확인한다.
const myCar = {
    SUV: true,
    options: {
        color: 'grey',
    },
};
it('자동차가 원하는 옵션들을 가지고 있다.', () => {
    expect(myCar)
        .toHaveProperty('SUV');
    expect(myCar)
        .toHaveProperty('options.color', 'grey');
    expect(myCar)
        .not
        .toHaveProperty('options.name');
});

//toMatch() 문자열이 정규식에 대응되는지 확인한다.
it('Lorem Ipsum 문자열을 포함한다', () => {
    expect('Lorem Ipsum is simply dummy')
        .toMatch(/Lorem Ipsum*/);
});

//toMatchObject() 객체 프로퍼티의 하위 집합이 특정 객체와 일치하는지 확인한다.
const yourCar = {
    SUV: true,
    options: {
        color: 'grey',
        size: 'big',
    },
};
it('자동차는 원하는 몇 가지 옵션을 가지고 있다.', () => {
    const severalOptions = {
        options: {
            color: 'grey',
        },
    };

    expect(yourCar)
        .toMatchObject(severalOptions);
});

//toThrow() 특정 상황에서 에러가 발생하는지 테스트한다.
test('TypeError를 발생시킨다', () => {
    const errorCausingFn = () => {
        throw new TypeError();
    };

    expect(errorCausingFn)
        .toThrow(TypeError);
});
