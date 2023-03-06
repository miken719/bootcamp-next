import {
  useBootcampByIdMutation,
  useBootcampByRadiusMutation,
  useBootcampMutation,
  useCourseByIdMutation,
} from "../reducer/bootcamp";

export const useBootcampHook = () => {
  const [fetchBootcamp, { data: bootcampData, isLoading: bootcampIsLoading }] =
    useBootcampMutation();

  const [
    fetchBootcampByRadius,
    { data: bootcampDataByRadius, isLoading: bootcampIsLoadingByRadius },
  ] = useBootcampByRadiusMutation();

  const [
    fetchBootcampById,
    { data: fetchBootcampByIdData, isLoading: bootcampByIdLoading },
  ] = useBootcampByIdMutation();
  const [
    fetchCoursesById,
    { data: fetchCoursesByIdData, isLoading: fetchCoursesByIdIsLoading },
  ] = useCourseByIdMutation();

  return {
    fetchBootcamp,
    bootcampData,
    bootcampIsLoading,
    fetchBootcampByRadius,
    bootcampDataByRadius,
    bootcampIsLoadingByRadius,
    fetchBootcampById,
    fetchBootcampByIdData,
    bootcampByIdLoading,
    fetchCoursesById,
    fetchCoursesByIdData,
    fetchCoursesByIdIsLoading,
  };
};
