import { useMemo, useState } from "react";
import { Link, HashIcon } from "lucide-react";

import Button from "@components/Button";
import Header from "@components/Header";
import Search from "@modules/Search";
import Stats from "@modules/Stats";
import Card from "@components/Card";
import type { IStatItem } from "@modules/Stats/Stats";
import Filters from "@components/Filters/Filters-new";

export interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  hashtags: string[];
  createdAt: Date;
  chatName?: string;
}

const initialLinks: Link[] = [
  {
    id: "1",
    url: "https://habr.com/ru/articles/advanced-react-patterns/",
    title: "Продвинутые паттерны React для разработчиков",
    description:
      "Статья о современных подходах в React разработке с примерами кода",
    hashtags: ["#react", "#js", "#фронтенд"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    chatName: "Frontend разработчики",
  },
  {
    id: "2",
    url: "https://www.figma.com/design-systems",
    title: "Дизайн-системы в Figma",
    hashtags: ["#дизайн", "#figma", "#ui"],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    chatName: "UI/UX дизайнеры",
  },
  {
    id: "3",
    url: "https://nodejs.org/docs/latest/api/",
    title: "Node.js API Documentation",
    description: "Официальная документация Node.js последней версии",
    hashtags: ["#nodejs", "#бэкенд", "#api"],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    chatName: "Node.js разработчики",
  },
];

function App() {
  const [links] = useState<Link[]>(initialLinks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const filtersItems = useMemo(() => {
    const tagSet = new Set<string>();
    links.forEach((link) => {
      link.hashtags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [links]);

  const statsItems: IStatItem[] = [
    {
      label: `${links.length} ссылки`,
      icon: Link,
    },
    {
      label: `${filtersItems.length} хештегов`,
      icon: HashIcon,
    },
  ];

  const filteredLinks = useMemo(() => {
    return links
      .filter((link) => {
        const matchesSearch =
          searchQuery === "" ||
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.url.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesHashtags =
          selectedHashtags.length === 0 ||
          selectedHashtags.some((tag) => link.hashtags.includes(tag));

        return matchesSearch && matchesHashtags;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [links, searchQuery, selectedHashtags]);

  const handleHashtagToggle = (hashtag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(hashtag)
        ? prev.filter((tag) => tag !== hashtag)
        : [...prev, hashtag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedHashtags([]);
  };

  return (
    <div className="app">
      <Header />

      <Stats items={statsItems} />

      <div
        className="add__link"
        style={{ textAlign: "center", marginTop: 36, marginBottom: 24 }}
      >
        <Button
          style={{
            height: 48,
            padding: "8px 16px",
            borderRadius: 16,
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            cursor: "pointer",
          }}
        >
          + Добавить ссылку
        </Button>
      </div>

      <div style={{ justifySelf: "center", marginBottom: 24, width: "100%" }}>
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div
        className="filters"
        style={{ justifySelf: "center", marginBottom: 24 }}
      >
        <Filters
          items={filtersItems}
          searchQuery={searchQuery}
          selectedHashtags={selectedHashtags}
          onHashtagToggle={handleHashtagToggle}
          onClearFilters={handleClearFilters}
        />
      </div>

      <div className="cards">
        {filteredLinks.length
          ? filteredLinks.map((link) => {
              return (
                <Card
                  key={link.id}
                  title={link.title}
                  date={link.createdAt}
                  desc={link.chatName || ""}
                  content={link.description || "Нет контента"}
                  tags={link.hashtags}
                />
              );
            })
          : "net"}
      </div>
    </div>
  );
}

export default App;
