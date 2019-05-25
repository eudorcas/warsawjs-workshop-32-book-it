# warsawjs-workshop-32-book-it

Repozytorium stworzone w celu przeprowadzenia warsztatów WarsawJS Workshop #32 - React.js dla zaawansowanych.

Do każdego ćwiczenia został przygotowany kod szkieletowy. Oznacza to, że w większości nie będzie potrzeby pisania od zera komponentów ani wtórego kodu konfiguracyjnego. Ma to na celu maksymalne skupienie się na praktycznym zastosowaniu zaawansowanych rozwiązań i utrwalanie zdobytej wiedzy.

**WAŻNE!** Ćwiczenia przygotowane są tak, aby w większości przypadków nie było wymagane zachowanie kolejności ich wykonywania. Podobnie jest z ich zawartością. Nie zawsze należy wykonać wszystkie polecenia aby przejść do kolejnego ćwiczenia.

## Przygotowanie

Przed przystąpieniem do warsztatów:

- sklonuj repozytorium
- zmień branch na `workshop`
- zainstaluj zależności
- uruchom aplikację i sprawdź czy wystartowała bez błędu

## Ćwiczenie A - Hooks: _useState_, _useEffect_

Za pomocą _useState_, _useEffect_ dokonaj zmian pliku `SelectHotel.js`, które pozwolą:

- pobrać listę hoteli i wyświetlić je w przeglądarce
- w trakcie pobierania wyświetlić komponent informujący o trwającym zapytaniu
- filtrować listę hoteli na podstawie wybranego typu łóżka
- sortować listę hoteli zgodnie z predefiniowanymi wartościami
- ukrywać i chować wykres zgodnie z wybraną wartością przełącznika
- wyświetlić liczbę hoteli dla każdego typu łóżka

## Ćwiczenie B - Hooks: _useCallback_, _useMemo_, _memo_

Za pomocą [React Developer Tools](https://github.com/facebook/react-devtools) zidentyfikuj komponenty, które rerenderują się w trakcie interakcji z listą hoteli. Następnie w pliku `SelectHotel.js` dokonaj zmian, które spowodują ponowne rerenderowanie się tylko tych komponentów, których dotyczyły zmiany. Wykorzystaj nowe api:

- _useMemo_ do memoizacji czasochłonnych obliczeń
- _useCallback_ do zapobiegania tworzeniu się nowych referencji do funkcji przy każdym rerenderze komponentu
- _memo_ do tworzenia komponentów renderujących się ponownie tylko wtedy gdy przekazywane propsy zmieniły referencję

## Ćwiczenie C - Code Splitting, lazy loading, _Suspense_

W pliku `SelectHotel.js` wprowadź zmiany:

- ustaw wykres jako domyślnie ukryty
- z wykorzystaniem _React.lazy_, _import()_ i _Suspense_ opakuj komponent `RatingChart` aby jego kod pobierany był tylko w momencie wyświetlenia wykresu, a w trakcie zapytania pokazywany był komponent tymczasowy
- zmień wywołanie _React.lazy_ aby pobieranie kodu komponentu `RatingChart` rozpoczęło się po pobraniu się głównego kodu źródłowego aplikacji
- stwórz funkcję pozwalającą wymuszać pobieranie kodu komponentu w trakcie interakcji z aplikacją

## Ćwiczenie D - _useReducer_, _useContext_

W pliku `BookingFlow.js` wprowadź zmiany pozwalające zarządzać kolejnymi etapami rezerwacji hotelu. Na rezerwację składa się wybranie hotelu, wybranie sposobu płatności i potwierdzenie rezerwacji. Do kolejnego etapu można przejść tylko po prawidłowym wykonaniu poprzedniego. W pierwszym etapie wprowadzania zmian użyj _useReducer_ do:

- zarządzania stanem aktualnie wyświetlanego etapu, wybranego hotelu i sposobu płatności
- przekazywania funkcji pozwalających na zmianę stanu rezerwacji i na przejście do kolejnego jej etapu
- przerwania trwającej rezerwacji i powrót do stanu początkowego

Następnie zmień sposób przekazywanie stanu zamówienia tak aby wykorzystywał on współdzielenie danych za pomocą _React Contex_.

## Ćwiczenie E - _redux_, _redux saga_

- W pliku `ConfirmBooking.js` oprogramuj przycisk `Zarezerwuj` aby po jego wciśnięciu wywoływane była funkcja przekazująca zdarzenie do redux store.
- W pliku `saga.js` napisz funkcję z wykorzystaniem biblioteki _redux-saga_ przechwytującą to zdarzenie i wywołującą zapytanie do api potwierdzającą rezerwację.
- W pliku `reducers.js` przygotuj redux reducer aby przechowywał stan trwającego zapytania i podłącz ten stan do komponentu `ConfirmBooking`.
- Wprowadź zmiany do napisanego kodu tak aby reagował na zamknięcie rezerwacji i przerywał trwające zapytanie do api.

_Podpowiedź_ Warto zajrzeć do plików w folderze `auth` gdzie zastosowano podobne

## Ćwiczenie F - _redux-api-middleware_, _immer_ oraz optymalizacja redux store

W plikach folderze `rating` dodaj kod który będzie umożliwiał:

- pobranie i wyświetlenie listy hoteli z wykorzystaniem funkcji _redux-api-middleware_
- ocenę hoteli i przechowywanie tych wartości w redux store pod kluczem `hotels[x].rating.user`
- pobranie kolejnych hoteli po kliknięciu na przycisk `Załaduj więcej` bez tracenia stanu aktualnie wprowadzonych ocen

Za pomocą [React Developer Tools](https://github.com/facebook/react-devtools) zidentyfikuj komponenty, które rerenderują się w trakcie oceny i doładowanie się kolejnych hoteli. Wyeliminuj zbędne ponowne renderowanie się komponentów za pomocą zmiany struktury redux store przy użyciu biblioteki _normalizr_ i podłączeniu do store każdego hotelu z osobna.

Za pomocą biblioteki _immer_ zmień kod `reducer.js` aby pozbyć się ręcznego budowania nowych obiektów w trakcie zmiany redux store.

## Kolejne ćwiczenia będą dodawane ...

## Linki - Dokumentacja przydatna podczas szkolenia:

- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) - dokumentacja Hooks API
- [Getting Started with Redux](https://redux.js.org/introduction/getting-started) - dokumentacja Redux'a
- [Redux-Saga](https://redux-saga.js.org) - dokumentacja Redux Saga
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) - dokumentacja Create React App
- [Semantic UI React](https://react.semantic-ui.com/) - dokumentacja Semantic UI React, gotowe komponenty wizualne
