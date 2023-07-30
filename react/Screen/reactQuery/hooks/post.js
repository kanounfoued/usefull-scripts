import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "../../../App";

const useGetPosts = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return useQuery(
    ["posts", page],
    () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res.data.slice(skip, limit + skip);
        });
    },
    {
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
      refetchInterval: false,
      // enabled: true,
      //   onSuccess: function,
      //   onSettled: function,
      //   onError: function,
    }
  );
};

const useAddPost = () => {
  return useMutation(
    (body) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", {
        body,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["posts", 1]);
      },
    }
  );
};

const useUpdatePost = () => {
  return useMutation(
    (body) =>
      axios.put(`https://jsonplaceholder.typicode.com/posts/${body.id}`, {
        body,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["posts", 1]);
      },
    }
  );
};

const useDeletePost = () => {
  return useMutation(
    (body) =>
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${body.id}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["posts", 1]);
      },
    }
  );
};

export { useGetPosts, useAddPost, useUpdatePost, useDeletePost };
