#include <iostream>
#include <vector>

auto next () -> int {
  int x;
  scanf("%d", &x);
  return x;
}

constexpr int kMaxn = 512 + 10;
constexpr int kMaxm = 20;

enum Type {
  MOVE = 1,
  TOPUP = 2,
};

struct Op {
  Type t;
  int victim;
  int target;
};
std::vector<int> flips;
std::vector<Op> ops;

struct Tube {
  int id;
  std::vector<int> buffer;
  int size;
  int capacity;
  auto full () {
    return size == capacity;
  }
  auto push (int from, int type) {
    if (size == capacity) {
      ops.push_back({ TOPUP, 0, id });
      ++capacity;
    }
    if (from > 0) {
      ops.push_back({ MOVE, from, id });
    }
    buffer.push_back(type);
    ++size;
  }
  auto pop () {
    int res = buffer[--size];
    buffer.pop_back();
    return res;
  }
  auto top () {
    return buffer[size - 1];
  }
  auto contains (int type) {
    for (int i = 0; i < size; ++i) if (buffer[i] == type) return true;
    return false;
  }
  auto empty () {
    return size == 0;
  }
};

int _testpoint, n, m;
int c[kMaxn];
int d[kMaxn][kMaxn];
Tube state[kMaxn];

auto input () {
  _testpoint = next();
  n = next();
  m = next();
  for (int i = 1; i <= n + 2; ++i) c[i] = next();
  for (int i = 1; i <= n; ++i) {
    for (int j = 1; j <= n; ++j) {
      d[i][j] = next();
      if (d[i][j] < 0) exit(1);
    }
  }
  for (int i = 1; i <= n; ++i) {
    state[i].capacity = m;
    state[i].id = i;
    for (int j = 1; j <= m; ++j) {
      state[i].push(0, next());
    }
  }
  for (int i = 1; i <= 2; ++i) {
    state[n + i].capacity = m;
    state[n + i].id = n + i;
  }
}

auto output () {
  printf("%ld %ld\n", flips.size(), ops.size());
  for (auto i : flips) printf("%d ", i);
  putchar('\n');
  for (const auto &op : ops) {
    if (op.t == MOVE) printf("1 %d %d\n", op.victim, op.target);
    else printf("2 %d\n", op.target);
  }
}

auto moveToBuffer (Tube &from) {
  state[n + 2].push(from.id, from.pop());
}

auto clear (int ix) {
  Tube &buf = state[ix];
  while (!buf.empty()) {
    int what = buf.pop();
    for (int i = 1; i < ix; ++i) {
      if (!state[i].full()) {
        state[i].push(ix, what);
        goto ok;
      }
    }
    output();
    exit(2);
    ok:;
  }
}

auto main () -> int {
  // freopen("data/1.in", "r", stdin);
  input();

  for (int i = n; i > 0; --i) {
    clear(i + 1);
    for (int j = 1; j <= i; ++j) {
      while (state[j].contains(i)) {
        while (state[j].top() != i) {
          moveToBuffer(state[j]);
        }
        while (!state[j].empty() && state[j].top() == i) {
          state[i + 1].push(j, state[j].pop());
        }
      }
    }
    if (state[i + 1].size != m) {
      output();
      exit(3);
    }
    clear(n + 2);
  }

  output();
  return 0;
}
